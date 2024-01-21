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
          apiKeySecretName: 'pinecone-test',
          environment: PineConeEnvironment.GCP_STARTER,
          dimension: 128,
          removalPolicy: RemovalPolicy.SNAPSHOT,
        }],
        customResourceSettings: {
          numAttemptsToRetryOperation: 2,
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
from aws_cdk import (
    App,
    RemovalPolicy,
    Stack,
    StackProps
)
from constructs import Construct
from pinecone_db_construct import PineconeIndex, PineConeEnvironment  # Assuming these exist in the ../index file relative to this file

class MyStack(Stack):
    def __init__(self, scope: Construct, id: str, props: StackProps = None):
        super().__init__(scope, id, props)

        PineconeIndex(
            self,
            'PineconeIndex',
            index_settings=[{
                'api_key_secret_name': 'pinecone-test',
                'environment': PineConeEnvironment.GCP_STARTER,
                'dimension': 128,
                'removal_policy': RemovalPolicy.SNAPSHOT,
            }],
            custom_resource_settings={
                'num_attempts_to_retry_operation': 2,
            }
        )

APP = App()

MyStack(APP, 'MyStack')

APP.synth()
```

## Common Issues
If running the default ARM deployment architecture and deploying on an x86_64 machine, you may run into the dreaded `exec /bin/sh: exec format error`, if this happens you have two options:
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

**Note:** first time bundling will be slower when running in emulation mode, so keep that in mind (adds about 40 sec for first time deployment). **Most most CICD environments will do this for you (github actions) with do this emulation out of the box for you.**

## Contributing

We welcome contributions, feedback, and bug reports. Before you contribute, please read our [contributing guidelines](CONTRIBUTING.md).

## Reporting Security Vulnerabilities

If you find a security issue, please contact us at [security@example.com](mailto:security@example.com). We take all security bugs seriously. Thank you for improving the security of our project.