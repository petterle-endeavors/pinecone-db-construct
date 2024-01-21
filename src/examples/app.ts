import {
  App,
  RemovalPolicy,
  Stack,
  StackProps,
  aws_lambda as lambda,
} from 'aws-cdk-lib';
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
        deploymentSettings: {
          numAttemptsToRetryOperation: 2,
          deploymentArchitecture: 
        },
      },
    );
  }
}

const app = new App();
new MyStack(app, 'MyStack');

app.synth();
