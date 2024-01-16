"""Define the runtime settings for the function."""
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """Define the runtime settings for the function."""

    num_attempts_to_run_operation: int = Field(
        default=5,
        description="The number of attempts to run an operation.",
    )
