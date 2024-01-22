"""Define the runtime settings for the function."""
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    """Define the runtime settings for the function."""

    model_config = SettingsConfigDict(
        populate_by_name=True,
        alias_generator=lambda name: name.upper(),
        extra="ignore",
    )

    max_num_attempts: int = Field(
        default=3,
        description="The number of attempts to run an operation.",
    )
