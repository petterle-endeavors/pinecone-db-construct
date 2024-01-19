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
// const customResourceDir = require('../resources/custom_resource'); // eslint-disable-line @typescript-eslint/no-require-imports

const CUSTOM_RESOURCE_DIRECTORY = path.join(__dirname, '../resources/custom_resource');


export interface CustomResourceSettings {
  readonly numAttemptsToRetryOperation?: number;
}

const DEFAULT_CUSTOM_RESOURCE_SETTINGS: CustomResourceSettings = {};

type LambdaConfig = {
  constructId: string;
  description: string;
  entry: string;
  index?: string;
  handler?: string;
  environment?: CustomResourceSettings;
  memorySize?: Size;
  timeout?: Duration;
  ephemeralStorageSize?: Size;
}

// Enums converted to TypeScript
export enum PodType {
  S1 = 's1',
  P1 = 'p1',
  P2 = 'p2',
}

export enum PodSize {
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

const MAX_INDEX_NAME_LENGTH = 45;

// Type converted from MetaDataConfig TypedDict
export interface MetaDataConfig {
  readonly indexed: string[];
};

export interface PineconeIndexSettings {
  readonly apiKeySecretName: string;
  readonly environment: PineConeEnvironment;
  readonly dimension: number;
  readonly name?: string;
  readonly removalPolicy?: RemovalPolicy;
  readonly metric?: DistanceMetric;
  readonly pods?: number;
  readonly replicas?: number;
  readonly podInstanceType?: PodType;
  readonly podSize?: PodSize;
  readonly metadataConfig?: MetaDataConfig;
  readonly sourceCollection?: string;
};

const DEFAULT_PINECONE_INDEX_SETTINGS: Omit<PineconeIndexSettings, 'apiKeySecretName' | 'environment' | 'dimension'> = {
  removalPolicy: RemovalPolicy.RETAIN,
  metric: DistanceMetric.DOT_PRODUCT,
  pods: 1,
  replicas: 1,
  podInstanceType: PodType.S1,
  podSize: PodSize.X1,
  sourceCollection: '',
};

export interface PineconeIndexProps {
  readonly indexSettings: PineconeIndexSettings[];
  readonly customResourceSettings?: CustomResourceSettings;
}


export class PineconeIndex extends Construct {
  private stackName: string;

  constructor(
    scope: Construct,
    id: string,
    props: PineconeIndexProps,
  ) {
    super(scope, id);
    this.stackName = Stack.of(this).stackName;
    let { indexSettings, customResourceSettings = {} } = props;
    indexSettings = indexSettings.map(indexSetting => {
      indexSetting = {
        ...DEFAULT_PINECONE_INDEX_SETTINGS,
        ...indexSetting,
      };
      return indexSetting;
    });

    customResourceSettings = {
      ...DEFAULT_CUSTOM_RESOURCE_SETTINGS,
      ...customResourceSettings,
    };
    const lambdaConfig: LambdaConfig = {
      constructId: `${id}Lambda`,
      description: 'Custom resource provider for configuring Pinecone indexes.',
      entry: CUSTOM_RESOURCE_DIRECTORY, // Set the directory path where the lambda code exists.
      environment: customResourceSettings,
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
      console.log(properties);
      const apiKeySecret = secretsManager.Secret.fromSecretNameV2(this, 'PineconeApiKey', indexSetting.apiKeySecretName);
      apiKeySecret.grantRead(lambdaFunc);

      new CustomResource(this, `${lambdaConfig.constructId}CustomResource`, {
        serviceToken: provider.serviceToken,
        properties: properties,
      });

      new CfnOutput(this, `${indexSetting.name}IndexName`, {
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

    // Create the Lambda function with the provided configuration.
    const dumpedEnv = this.dumpToEnv(environment);
    console.log(dumpedEnv);
    const lambda_func = new python_lambda.PythonFunction(
      this,
      `${constructId}`,
      {
        description: description,
        entry: entry,
        index: index,
        handler: handler,
        runtime: lambda.Runtime.PYTHON_3_10,
        architecture: lambda.Architecture.ARM_64,
        bundling: {
          // this is needed because we are running ARM
          // if we were running x86, we would NOT need any bundling
          // options as the PythonFunction construct takes care of this for us
          environment: {
            PIP_PLATFORM: 'manylinux2014_aarch64',
            PIP_ONLY_BINARY: ':all:',
          },
        },
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
    const suffix = md5(serviceToken).substring(0, suffixLength);
    const indexNameLength = MAX_INDEX_NAME_LENGTH - prefixLength - suffixLength;
    const name = `${prefix}-${indexName.substring(0, indexNameLength)}-${suffix}`;
    return name.substring(0, MAX_INDEX_NAME_LENGTH);
  }

  private dumpToEnv(env: { [key: string]: any }): { [key: string]: string } {
    return this.serializeEnv(this.convertCamelToEnvVarName(env));
  }

  private serializeEnv(env: { [key: string]: any }): { [key: string]: string } {
    let serializedEnv: { [key: string]: string } = {};
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
