import * as fs from 'fs';
import * as path from 'path';
import * as python_lambda from '@aws-cdk/aws-lambda-python-alpha';
import {
  CustomResource,
  Duration,
  Size,
  CfnOutput,
  RemovalPolicy,
  Stack,
  aws_secretsmanager as secretsManager,
  custom_resources as customResources,
  aws_lambda as lambda,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { md5 } from 'js-md5';

const CUSTOM_RESOURCE_DIRECTORY = path.join(__dirname, '../resources/custom_resource');


export interface DeploymentSettings {
  readonly maxNumAttempts?: number;
  readonly deploymentArchitecture?: lambda.Architecture;
}

const DEFAULT_DEPLOYMENT_SETTINGS: DeploymentSettings = {
  maxNumAttempts: 3,
  deploymentArchitecture: lambda.Architecture.X86_64,
};

type LambdaConfig = {
  constructId: string;
  description: string;
  entry: string;
  index?: string;
  handler?: string;
  environment?: DeploymentSettings;
  memorySize?: Size;
  timeout?: Duration;
  ephemeralStorageSize?: Size;
}

// Enums converted to TypeScript
export enum PodInstanceType {
  S1 = 's1',
  P1 = 'p1',
  P2 = 'p2',
}

export enum PodInstanceSize {
  X1 = 'x1',
  X2 = 'x2',
  X4 = 'x4',
  X8 = 'x8',
}

export enum DistanceMetric {
  EUCLIDEAN = 'euclidean',
  COSINE = 'cosine',
  DOT_PRODUCT = 'dotproduct',
}

export enum PineConeEnvironment {
  GCP_STARTER = 'gcp-starter',
  GCP_FREE_US_WEST_1 = 'us-west1-gcp-free',
  GCP_FREE_ASIA_SOUTHEAST_1 = 'asia-southeast1-gcp-free',
  GCP_FREE_US_WEST_4 = 'us-west4-gcp-free',
  GCP_STD_US_WEST_1 = 'us-west1-gcp',
  GCP_STD_US_CENTRAL_1 = 'us-central1-gcp',
  GCP_STD_US_WEST_4 = 'us-west4-gcp',
  GCP_STD_US_EAST_4 = 'us-east4-gcp',
  GCP_STD_NORTH_AMERICA_NORTHEAST_1 = 'northamerica-northeast1-gcp',
  GCP_STD_ASIA_NORTHEAST_1 = 'asia-northeast1-gcp',
  GCP_STD_ASIA_SOUTHEAST_1 = 'asia-southeast1-gcp',
  GCP_STD_US_EAST_1 = 'us-east1-gcp',
  GCP_STD_EU_WEST_1 = 'eu-west1-gcp',
  GCP_STD_EU_WEST_4 = 'eu-west4-gcp',
  AWS_STD_US_EAST_1 = 'us-east-1-aws',
  AZURE_STD_EAST_US = 'eastus-azure',
}

export enum CloudProvider {
  AWS = 'aws',
}

export enum Region {
  US_WEST_2 = 'us-west-2',
}

const MAX_INDEX_NAME_LENGTH = 45;

// Type converted from MetaDataConfig TypedDict
export interface MetaDataConfig {
  readonly indexed: string[];
};

export interface PodSpec {
  readonly environment: PineConeEnvironment;
  readonly numReplicas?: number;
  readonly shards?: number;
  readonly numPods?: number;
  readonly podInstanceType?: PodInstanceType;
  readonly podInstanceSize?: PodInstanceSize;
  readonly metaDataConfig?: MetaDataConfig;
}

export interface ServerlessSpec {
  readonly cloudProvider: CloudProvider;
  readonly region: Region;
};

export interface PineconeIndexSettings {
  readonly apiKeySecretName: string;
  readonly dimension: number;
  readonly podSpec: PodSpec | ServerlessSpec;
  readonly name?: string;
  readonly removalPolicy?: RemovalPolicy;
  readonly metric?: DistanceMetric;
};

export interface PineconeIndexProps {
  readonly indexSettings: PineconeIndexSettings[];
  readonly deploymentSettings?: DeploymentSettings;
}


export class PineconeIndex extends Construct {
  private stackName: string;
  private deploymentSettings: DeploymentSettings;

  constructor(
    scope: Construct,
    id: string,
    props: PineconeIndexProps,
  ) {
    super(scope, id);
    this.stackName = Stack.of(this).stackName;
    let { indexSettings, deploymentSettings = {} } = props;

    deploymentSettings = {
      ...DEFAULT_DEPLOYMENT_SETTINGS,
      ...deploymentSettings,
    };
    this.deploymentSettings = deploymentSettings;
    const lambdaConfig: LambdaConfig = {
      constructId: `${id}Lambda`,
      description: 'Custom resource provider for configuring Pinecone indexes.',
      entry: CUSTOM_RESOURCE_DIRECTORY, // Set the directory path where the lambda code exists.
      environment: deploymentSettings,
    };

    this.createCustomResource(lambdaConfig, indexSettings);
  }

  private convertCamelToEnvVarName(object: { [key: string]: any }): { [key: string]: string } {
    let converted: { [key: string]: string } = {};
    for (let key in object) {
      converted[key.replace(/([A-Z])/g, '_$1').toUpperCase()] = object[key];
    }
    return converted;
  }

  private createCustomResource(
    lambdaConfig: LambdaConfig,
    indexSettings: PineconeIndexSettings[],
  ): customResources.Provider {
    const lambdaFunc = this.createLambdaFunction(lambdaConfig);
    const provider = new customResources.Provider(this, `${lambdaConfig.constructId}Provider`, {
      onEventHandler: lambdaFunc,
    });

    indexSettings.forEach((indexSetting, index) => {
      const properties = this.serializeEnv(indexSetting);
      if (indexSetting.name === undefined) {
        properties.name = this.getIndexName(provider.serviceToken, `index${index}`);
      }
      properties.customResourceDirHash = this.getHashForAllFilesInDir(CUSTOM_RESOURCE_DIRECTORY);
      const apiKeySecret = secretsManager.Secret.fromSecretNameV2(this, 'PineconeApiKey', indexSetting.apiKeySecretName);
      apiKeySecret.grantRead(lambdaFunc);

      new CustomResource(this, `${lambdaConfig.constructId}CustomResource`, {
        serviceToken: provider.serviceToken,
        properties: properties,
      });

      new CfnOutput(this, `Index${index}Name`, {
        value: properties.name,
        description: `Name of the '${indexSetting.name}' Pinecone index.`,
      });
    });

    return provider;
  }

  private createLambdaFunction(config: LambdaConfig): python_lambda.PythonFunction {
    const {
      constructId,
      description,
      entry,
      index = 'function/index.py',
      handler = 'lambda_handler',
      environment = {},
      memorySize = Size.mebibytes(256),
      timeout = Duration.seconds(60),
      ephemeralStorageSize = Size.mebibytes(512),
    } = config;

    const dumpedEnv = this.dumpToEnv(environment);
    let bundling = {};
    if (this.deploymentSettings.deploymentArchitecture === lambda.Architecture.ARM_64) {
      bundling = {
        // this is needed because we are running ARM
        // if we were running x86, we would NOT need any bundling
        // options as the PythonFunction construct takes care of this for us
        environment: {
          PIP_PLATFORM: 'manylinux2014_aarch64',
          PIP_ONLY_BINARY: ':all:',
        },
      };
    }
    const lambda_func = new python_lambda.PythonFunction(
      this,
      `${constructId}`,
      {
        description: description,
        entry: entry,
        index: index,
        handler: handler,
        runtime: lambda.Runtime.PYTHON_3_10,
        architecture: this.deploymentSettings.deploymentArchitecture,
        bundling: bundling,
        environment: dumpedEnv,
        memorySize: memorySize.toMebibytes(),
        ephemeralStorageSize: ephemeralStorageSize,
        timeout: timeout,
      },
    );

    new CfnOutput(this, `${config.constructId}LambdaArn`, {
      value: lambda_func.functionArn,
      description: `ARN for the ${config.constructId} Lambda function.`,
    });

    return lambda_func;
  }

  private getIndexName(serviceToken: string, indexName: string): string {
    const suffixLength = 20;
    const prefixLength = 15;
    const prefix = this.stackName.substring(0, prefixLength).toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    const serviceTokenPrefix = serviceToken.split('-').slice(0, -1).join('-');
    const suffix = md5(serviceTokenPrefix).substring(0, suffixLength);
    const indexNameLength = MAX_INDEX_NAME_LENGTH - prefixLength - suffixLength;
    const name = `${prefix}-${indexName.substring(0, indexNameLength)}-${suffix}`;
    return name.substring(0, MAX_INDEX_NAME_LENGTH);
  }

  private dumpToEnv(env: { [key: string]: any }): { [key: string]: string } {
    return this.serializeEnv(this.convertCamelToEnvVarName(env));
  }

  private serializeEnv(env: { [key: string]: any }): { [key: string]: any } {
    let serializedEnv: { [key: string]: any } = {};
    for (let key in env) {
      if (typeof env[key] === 'string') {
        serializedEnv[key] = env[key];
      } else if (env[key] !== null) {
        serializedEnv[key] = JSON.stringify(env[key]);
      }
    }
    return serializedEnv;
  }

  private getHashForAllFilesInDir(directory: string): string {
    const files = fs.readdirSync(directory);
    let fileData = '';
    for (let file of files) {
      const filePath = path.join(directory, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        fileData += this.getHashForAllFilesInDir(filePath);
      } else {
        fileData += fs.readFileSync(filePath, 'utf8');
      }
    }
    let hash = md5.create();
    hash.update(fileData);
    return hash.hex();
  }

}
