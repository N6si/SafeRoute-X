import uuid

from geoalchemy2 import Geometry
from sqlalchemy import String, Float, DateTime, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.database import Base


class RiskZone(Base):
    __tablename__ = "risk_zones"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    risk_level: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    risk_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    geometry = mapped_column(
        Geometry(
            "POLYGON",
            srid=4326,
            spatial_index=False,
        ),
        nullable=False,
    )

    created_at = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    __table_args__ = (
        Index(
            "idx_risk_zones_geometry",
            "geometry",
            postgresql_using="gist",
        ),
    )