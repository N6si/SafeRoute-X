import uuid

from sqlalchemy.sql import func
from geoalchemy2 import Geometry
from sqlalchemy import String, Float, DateTime, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class RiskObservation(Base):
    __tablename__ = "risk_observations"

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

    risk_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    risk_level: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    risk_score: Mapped[float | None] = mapped_column(
        Float,
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

    observed_at = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    created_at = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    __table_args__ = (
        Index(
            "idx_risk_observations_location",
            "location",
            postgresql_using="gist",
        ),
    )