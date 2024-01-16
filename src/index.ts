import { Construct } from 'constructs';
const customResourceDir = require("../resources/custom_resource"); // eslint-disable-line @typescript-eslint/no-require-imports
import * as cdk from "aws-cdk-lib";
import { Construct, CustomResource, Duration, Size, CfnOutput } from "@aws-cdk";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from "@aws-cdk/aws-iam";
import * as secretsmanager from "@aws-cdk/aws-secretsmanager";
import * as path from "path";
import * as custom_resources from "@aws-cdk/custom-resources";
import * as fs from "fs";
import * as python_lambda from '@aws-cdk/aws-lambda-python-alpha';

export interface PineconeIndexSettings {
  // Define your settings interface with the properties you need.
  name: string;
  apiSecretName: string;
}

interface LambdaConfig {
  constructId: string;
  description: string;
  entry: string;
  index?: string;
  handler?: string;
  environment?: { [key: string]: string };
  memorySize?: cdk.Size;
  timeout?: cdk.Duration;
  ephemeralStorageSize?: cdk.Size,
}

export class PineconeIndex extends Construct {
  private indexSettings: PineconeIndexSettings[];

  constructor(
    scope: Construct,
    id: string,
    indexSettings: PineconeIndexSettings | PineconeIndexSettings[],
    indexDirectory: string
  ) {
    super(scope, id);
    this.indexSettings = Array.isArray(indexSettings)
      ? indexSettings
      : [indexSettings];

    // The path to your Lambda directory within your project.
    const lambdaConfig: LambdaConfig = {
      constructId: `${id}Lambda`,
      description: "Custom resource provider for configuring Pinecone indexes.",
      indexDirectory: indexDirectory, // Set the directory path where the lambda code exists.
      // Additional LambdaConfig properties can be set here.
    };

    const customResourceProvider: Provider =
      this.createCustomResource(lambdaConfig);

    // Additional logic for setting up the CustomResource, similar to the for-loop in Python.
  }

  private createCustomResource(
    lambda_config: LambdaConfig,
    index_settings: PineconeIndexSettings
  ): custom_resources.Provider {}
    const lambda_func = this.createLambdaFunction(lambda_config);
    const provider = new Provider(this, `${lambda_config.constructId}Provider`, {
      onEventHandler: lambda_func,
    });
//     for index_settings in self._index_settings:
//     index_settings.name = self.get_index_name(provider, index_settings)
//     properties = self.serialize_env(index_settings)
//     # we are adding these properties so that cloudformation will
//     # update the custom resource when either the settings have changed
//     # or the custom resource directory has changed, i.e. the lambda
//     # function code has changed
//     properties["custom_resource_dir_hash"] = self.get_hash_for_all_files_in_dir(_CUSTOM_RESOURCE_DIRECTORY)
//     api_key_secret = Secret.from_secret_name_v2(self, "PineconeApiKey", index_settings.api_key_secret_name)
//     api_key_secret.grant_read(function)
//     CustomResource(
//         self,
//         id=f"{func_config.construct_id}CustomResource",
//         service_token=provider.service_token,
//         properties=properties,
//     )
//     CfnOutput(
//         self,
//         f"{index_settings.name}IndexName",
//         value=index_settings.name,
//         description=f"Name of the '{index_settings.name}' Pinecone index.",
//     )
// return provider
    // translate to typescript
    

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
      memorySize = cdk.Size.mebibytes(256),
      timeout = cdk.Duration.seconds(60),
      ephemeralStorageSize = cdk.Size.mebibytes(512),
    } = config;
  
    // Create the Lambda function with the provided configuration.
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
        environment: environment,
        memorySize: memorySize.toMebibytes(),
        ephemeralStorageSize: ephemeralStorageSize,
        timeout: timeout,
      },
    );

    new cdk.CfnOutput(this, `${config.constructId}LambdaArn`, {
      value: lambda_func.functionArn,
      description: `ARN for the ${config.constructId} Lambda function.`,
    });

    return lambda_func;
  }

  // ... additional methods for serializeEnv, getHashForAllFilesInDir, etc.

  private serializeEnv(env: { [key: string]: any }): { [key: string]: string } {
    let serializedEnv: { [key: string]: string } = {};
    for (let key in env) {
      if (typeof env[key] === "string") {
        serializedEnv[key] = env[key];
      } else {
        // Use JSON.stringify to serialize non-string values.
        serializedEnv[key] = JSON.stringify(env[key]);
      }
    }
    return serializedEnv;
  }

  private getHashForAllFilesInDir(directory: string): string {
    let hash = crypto.createHash("md5");

    const files = fs.readdirSync(directory);
    for (let file of files) {
      // Read files recursively if needed and update the hash.
      const filePath = path.join(directory, file);
      const fileData = fs.readFileSync(filePath);
      hash.update(fileData);
    }

    return hash.digest("hex");
  }

  // ... other methods and logic to finish the construct.
}
