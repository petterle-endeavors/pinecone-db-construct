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
)
  

class MyStack(Stack):
    def __init__(self, scope: Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        PineconeIndex(
            self,
            'PineconeIndex',
            index_settings=[
                PineconeIndexSettings(
                    api_key_secret_name='pinecone-test',
                    dimension=128,
                    removal_policy=RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
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