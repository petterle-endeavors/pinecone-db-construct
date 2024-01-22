"""Define the lambda function for initializing the Pinecone database."""
import copy
from json import JSONDecodeError
import json
import logging
from typing import Any, Dict, Union
from crhelper import CfnResource, FAILED

from aws_lambda_powertools.utilities.typing import LambdaContext
from .pinecone_settings import PineconeIndexSettings
from .settings import Settings
from .pinecone import PineconeIndex

LOGGER = logging.getLogger(__name__)

helper = CfnResource(
    json_logging=True,
    log_level="INFO",
    boto_level="CRITICAL",
    # polling_interval=1,
)

SETTINGS: Union[Settings, None] = None
try:
    SETTINGS = Settings()  # type: ignore
except Exception as error:  # pylint: disable=broad-except
    helper.init_failure(error)


@helper.create
def create(_: Dict[str, Any], context: LambdaContext) -> Union[bool, str, None]:
    """Create the Pinecone database."""
    index: PineconeIndex = context.index # type: ignore
    LOGGER.info("Creating Pinecone index '%s'", index.name)
    index.create()
    return index.name


@helper.update
def update(event: Dict[str, Any], context: LambdaContext) -> Union[bool, str, None]:
    """Update the Pinecone database."""
    assert SETTINGS is not None, "SETTINGS is None"
    index: PineconeIndex = context.index # type: ignore
    resource_id = event.get("PhysicalResourceId")
    assert (
        index.name == resource_id
    ), f"PhysicalResourceId '{resource_id}' does not match index name '{index.name}'"
    LOGGER.info("Updating Pinecone index '%s'", index.name)
    index.update()


@helper.delete
def delete(event: Dict[str, Any], context: LambdaContext) -> Union[bool, str, None]:
    """Delete the Pinecone database."""
    assert SETTINGS is not None, "SETTINGS is None"
    index: PineconeIndex = context.index # type: ignore
    resource_id = event.get("PhysicalResourceId")
    assert (
        index.name == resource_id
    ), f"Cannot change index name: PhysicalResourceId '{resource_id}' does not match index name '{index.name}'"
    LOGGER.info("Deleting Pinecone index '%s'", index.name)
    index.delete()


def deserialize_fields(obj: Dict[str, Any]) -> Dict[str, Any]:
    """Deserialize the event."""
    for key, value in obj.items():
        try:
            obj[key] = json.loads(value)
        except JSONDecodeError:
            obj[key] = value
    return obj


def lambda_handler(event: dict, context: LambdaContext):
    """Handle the lambda event."""
    LOGGER.info("Received event: %s", event)
    assert SETTINGS is not None, "SETTINGS is None"
    props = deserialize_fields(event["ResourceProperties"])
    index_settings = PineconeIndexSettings.model_validate(props)
    context.index = PineconeIndex(  # type: ignore
        settings=SETTINGS,
        index_settings=index_settings,
    )
    helper(event, context)
    if helper.Status == FAILED:
        raise RuntimeError(f"Failed to create custom resource: {helper.Reason}")
    LOGGER.debug("Returning PhysicalResourceId '%s'", helper.PhysicalResourceId)
    return {"PhysicalResourceId": helper.PhysicalResourceId}
