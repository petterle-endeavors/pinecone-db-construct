"""Define custom resource class for constructs."""
import json
import time
from abc import ABC, abstractmethod
from enum import Enum
from hashlib import md5
from typing import Callable, Dict, Union

import boto3
from botocore.config import Config as BotoConfig
from aws_lambda_powertools.utilities.typing import LambdaContext


DELAY_BEFORE_CONNECTION_ATTEMPT = 5
MAX_NUM_ATTEMPTS = 3
DELAY_BETWEEN_ATTEMPTS = 3


class CRUDOperation(str, Enum):
    """Define the CRUD operations."""

    CREATE = "Create"
    UPDATE = "Update"
    DELETE = "Delete"


class CustomResourceInterface(ABC):
    """Define an interface for custom resources."""

    def __init__(self, event: CloudFormationCustomResourceEvent, context: LambdaContext) -> None:  # type: ignore
        super().__init__()
        self._event = event
        self._context = context
        self._stack_name: str = event["StackId"].split("/")[1]
        self._stack_name_hash = md5(self._stack_name.encode()).hexdigest()

    def execute_crud_operation(self) -> None:
        """Execute the CRUD operation."""
        request_type = self._event["RequestType"]
        if request_type == CRUDOperation.CREATE.value:
            logger.info("Creating resource")
            self._create_resource()
        elif request_type == CRUDOperation.UPDATE.value:
            logger.info("Updating resource")
            self._update_resource()
        elif request_type == CRUDOperation.DELETE.value:
            logger.info("Deleting resource")
            self._delete_resource()
        else:
            raise ValueError(f"Invalid request type: {request_type}")

    @staticmethod
    def get_secret(secret_name: str) -> Union[str, Dict[str, str]]:
        """Retrieve a secret from AWS Secrets Manager."""
        logger.info(f"Retrieving secret: {secret_name}")
        session = boto3.session.Session()
        boto_config = BotoConfig(
            retries={
                "max_attempts": MAX_NUM_ATTEMPTS,
                "mode": "standard",
            },
            connect_timeout=1,
            read_timeout=1,
        )
        client = session.client(
            service_name="secretsmanager",
            config=boto_config,
        )
        secret_value_response = client.get_secret_value(SecretId=secret_name)
        secret = secret_value_response["SecretString"]
        try:
            secret = json.loads(secret)
        except json.JSONDecodeError:
            logger.info("Secret is not a JSON string.")
        return secret

    @abstractmethod
    def _create_resource(self) -> None:
        """Create the resource."""

    @abstractmethod
    def _update_resource(self) -> None:
        """Update the resource."""

    @abstractmethod
    def _delete_resource(self) -> None:
        """Delete the resource."""

    def _run_operation_with_retry(self, operation: Callable, *args, **kwargs) -> None:
        for attempt in range(MAX_NUM_ATTEMPTS):
            try:
                operation(*args, **kwargs)
                return
            except Exception as error:  # pylint: disable=broad-except
                logger.exception(error)
                logger.info(f"Attempt {attempt + 1} of {MAX_NUM_ATTEMPTS} failed.")
                if attempt + 1 == MAX_NUM_ATTEMPTS:
                    logger.error(f"Failed to run operation: {operation.__name__}")
                    raise error
                logger.info(f"Retrying in {DELAY_BETWEEN_ATTEMPTS} seconds...")
                time.sleep(DELAY_BETWEEN_ATTEMPTS)