![Pinecone DB Icon](https://avatars.githubusercontent.com/u/54333248?s=200&v=4)

# Pinecone DB Construct for AWS CDK

[![CI](https://github.com/petterle-endeavors/pinecone-db-construct/workflows/build/badge.svg)](https://github.com/petterle-endeavors/pinecone-db-construct/actions?query=workflow%3Abuild+event%3Apush+branch%3Amain)
[![NPM version](https://img.shields.io/npm/v/pinecone-db-construct.svg)](https://www.npmjs.com/package/pinecone-db-construct)
[![PyPI version](https://img.shields.io/pypi/v/pinecone-db-construct.svg)](https://pypi.org/project/pinecone-db-construct/)
[![License](https://img.shields.io/github/license/petterle-endeavors/pinecone-db-construct.svg)](https://github.com/petterle-endeavors/pinecone-db-construct/blob/main/LICENSE)

The Pinecone DB Construct for AWS CDK is a JSII-constructed library that simplifies the creation and management of Pinecone indexes in your AWS infrastructure. It allows you to define, configure, and orchestrate your vector database resources alongside your AWS resources within your CDK application.

## Features

- Define Pinecone index configurations in code using familiar AWS CDK constructs.
- Automate the setup and configuration of Pinecone resources with AWS Lambda and AWS Secrets Manager.
- Seamlessly integrate Pinecone DB into your cloud-native applications.
- Supports ARM serverless for deployments

## Installation

Install this construct library using npm or pip, depending on your development language:

For TypeScript/JavaScript users:

```bash
npm install pinecone-db-construct
```

For Python users:

```bash
pip install pinecone-db-construct
```

## Usage

### TypeScript

Below is an example demonstrating how to use the Pinecone DB Construct in a TypeScript CDK application:

```typescript
import { App, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PineconeIndex, PineConeEnvironment } from '../index';

class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new PineconeIndex(
      this,
      'PineconeIndex',
      {
        indexSettings: [{
          apiKeySecretName: 'pinecone-test',  // store as a string in secrets manager, NOT a key/value secret
          dimension: 128,
          removalPolicy: RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
          // Pod Index (see python example for serverless)
          podSpec: {
            environment: PineConeEnvironment.GCP_STARTER,
          },
        }],
        deploymentSettings: {
          maxNumAttempts: 2,
        },
      },
    );
  }
}

const APP = new App();

new MyStack(APP, 'MyStack');

APP.synth();
```

### Python

For CDK applications written in Python, you can use the construct as shown:

```python
from constructs import Construct
from aws_cdk import (
    App,
    RemovalPolicy,
    Stack,
)
from pinecone_db_construct import (
    PineconeIndex,
    CloudProvider,
    Region,
    PineconeIndexSettings,
    ServerlessSpec,
    DeploymentSettings,
)s
  

class MyStack(Stack):
    def __init__(self, scope: Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        PineconeIndex(
            self,
            'PineconeIndex',
            index_settings=[
                PineconeIndexSettings(
                    api_key_secret_name='pinecone-test',  # store as a string in secrets manager, NOT a key/value secret
                    dimension=128,
                    removal_policy=RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
                    # Serverless Index (see typescript example for Pod)
                    pod_spec=ServerlessSpec(
                        cloud_provider=CloudProvider.AWS,
                        region=Region.US_WEST_2,
                    ),
                ),
            ],
            deployment_settings=DeploymentSettings(
                max_num_attempts=2,
            ),
        )

APP = App()

MyStack(APP, 'MyStack')

APP.synth()
```

## Common Issues
If running the ARM deployment architecture (configurable through the `deploymentSettings` prop) and deploying ON (not to) an x86_64 machine, you may run into the dreaded `exec /bin/sh: exec format error`, if this happens you have two options:
1. Switch to x86 architecture (Lame 😒):
  ```
  new PineconeIndex(
  this,
  'PineconeIndex',
  {
    deploymentSettings: {
      deploymentArchitecture: lambda.Architecture.X86_64,
    },
    .
    .
    .
  })
  ```
2. Allow docker to emulate ARM (Better 💪):
  ```
  docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
  ```

**Note:** first time bundling in emulation mode will be slower when running in emulation mode, so keep that in mind (adds about 40 sec for first time deployment). **Most most CICD environments will do this for you (github actions) with do this emulation out of the box for you.**

## Contributing

I'd love if you wanted to contribute, provide feedback, and/or report bugs. Before you contribute, please read the [contributing guidelines](CONTRIBUTING.md).
