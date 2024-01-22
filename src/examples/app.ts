import { App, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PineconeIndex, CloudProvider, Region } from '../index';

class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new PineconeIndex(
      this,
      'PineconeIndex',
      {
        indexSettings: [{
          apiKeySecretName: 'pinecone-test',
          dimension: 128,
          removalPolicy: RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
          podSpec: {
            cloudProvider: CloudProvider.AWS,
            region: Region.US_WEST_2,
          },
        }],
        deploymentSettings: {
          maxNumberOfAttempts: 2,
        },
      },
    );
  }
}

const app = new App();
new MyStack(app, 'MyStack');

app.synth();
