import uuid

from geoalchemy2 import Geometry
from sqlalchemy import String, Float, DateTime, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class WeatherObservation(Base):
    __tablename__ = "weather_observations"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    source_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("data_sources.id"),
        nullable=True,
    )

    location = mapped_column(
        Geometry(
            "POINT",
            srid=4326,
            spatial_index=False,
        ),
        nullable=False,
    )

    temperature: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    humidity: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    rainfall: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    wind_speed: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    visibility: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    weather_condition: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    observed_at = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    __table_args__ = (
        Index(
            "idx_weather_observations_location",
            "location",
            postgresql_using="gist",
        ),
    )