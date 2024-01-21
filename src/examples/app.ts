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
          removalPolicy: RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
        }],
        deploymentSettings: {
          numAttemptsToRetryOperation: 2,
        },
      },
    );
  }
}

const app = new App();
new MyStack(app, 'MyStack');

app.synth();
