"""Pinecone index config settings."""
from enum import Enum
from typing import List, Optional
from typing_extensions import TypedDict
from pydantic import Field, BaseModel, ConfigDict



class MetaDataConfig(TypedDict):
    """Define the metadata configuration for the Pinecone index."""

    indexed: List[str]


class PodType(str, Enum):
    """Define the pod types."""

    S1 = "s1"
    P1 = "p1"
    P2 = "p2"


class PodSize(str, Enum):
    """Define the pod sizes."""

    X1 = "x1"
    X2 = "x2"
    X4 = "x4"
    X8 = "x8"


class DistanceMetric(str, Enum):
    """Define the distance metrics."""

    EUCLIDEAN = "euclidean"
    COSINE = "cosine"
    DOT_PRODUCT = "dotproduct"


class RemovalPolicy(str, Enum):
    """Define the removal policies."""

    DESTROY = "destroy"
    RETAIN = "retain"
    RETAIN_ON_UPDATE_OR_DELETE = "retain-on-update-or-delete"
    SNAPSHOT = "snapshot"


class PineConeEnvironment(str, Enum):
    """Define the environments for the Pinecone project."""

    GCP_STARTER = "gcp-starter"
    GCP_FREE_US_WEST_1 = "us-west1-gcp-free"
    GCP_FREE_ASIA_SOUTHEAST_1 = "asia-southeast1-gcp-free"
    GCP_FREE_US_WEST_4 = "us-west4-gcp-free"
    GCP_STD_US_WEST_1 = "us-west1-gcp"
    GCP_STD_US_CENTRAL_1 = "us-central1-gcp"
    GCP_STD_US_WEST_4 = "us-west4-gcp"
    GCP_STD_US_EAST_4 = "us-east4-gcp"
    GCP_STD_NORTH_AMERICA_NORTHEAST_1 = "northamerica-northeast1-gcp"
    GCP_STD_ASIA_NORTHEAST_1 = "asia-northeast1-gcp"
    GCP_STD_ASIA_SOUTHEAST_1 = "asia-southeast1-gcp"
    GCP_STD_US_EAST_1 = "us-east1-gcp"
    GCP_STD_EU_WEST_1 = "eu-west1-gcp"
    GCP_STD_EU_WEST_4 = "eu-west4-gcp"
    AWS_STD_US_EAST_1 = "us-east-1-aws"
    AZURE_STD_EAST_US = "eastus-azure"


MAX_INDEX_NAME_LENGTH = 45


def to_camel_case(snake_str: str) -> str:
    """Convert snake case to camel case."""
    components = snake_str.split("_")
    return components[0] + "".join(x.title() for x in components[1:])


class PineconeIndexSettings(BaseModel):
    """Define the settings for the Pinecone index."""

    model_config = ConfigDict(
        alias_generator=to_camel_case,
        populate_by_name=True,
    )

    api_key_secret_name: str = Field(
        ...,
        description="The name of the secret containing the Pinecone API key.",
    )
    environment: PineConeEnvironment = Field(
        ...,
        description="The environment to use for the Pinecone project.",
    )
    removal_policy: RemovalPolicy = Field(
        default=RemovalPolicy.RETAIN,
        description="The removal policy for the Pinecone indexes.",
    )
    name: str = Field(
        ...,
        min_length=1,
        max_length=MAX_INDEX_NAME_LENGTH,
        description="This will be appended to  ",
    )
    dimension: int = Field(
        ...,
        description="Dimension of vectors stored in the index.",
    )
    metric: DistanceMetric = Field(
        default=DistanceMetric.DOT_PRODUCT,
        description="Distance metric used to compute the distance between vectors.",
    )
    pods: int = Field(
        default=1,
        le=2,
        ge=1,
        description="Number of pods to use for the index.",
    )
    replicas: int = Field(
        default=1,
        le=1,
        ge=1,
        description="Number of replicas to use for the index.",
    )
    pod_instance_type: PodType = Field(
        default=PodType.S1,
        description="Type of pod to use for the index. (https://docs.pinecone.io/docs/indexes)",
    )
    pod_size: PodSize = Field(
        default=PodSize.X1,
        description="Size of pod to use for the index. (https://docs.pinecone.io/docs/indexes)",
    )
    metadata_config: Optional[MetaDataConfig] = Field(
        default=None,
        description="Metadata configuration for the index.",
    )
    source_collection: str = Field(
        default="",
        description="Name of the source collection to use for the index.",
    )
