import uuid

from geoalchemy2 import Geometry
from sqlalchemy import DateTime, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.database import Base


class Route(Base):
    __tablename__ = "routes"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=True,
    )

    start_location = mapped_column(
        Geometry(
            "POINT",
            srid=4326,
            spatial_index=False,
        ),
        nullable=False,
    )

    destination_location = mapped_column(
        Geometry(
            "POINT",
            srid=4326,
            spatial_index=False,
        ),
        nullable=False,
    )

    geometry = mapped_column(
        Geometry(
            "LINESTRING",
            srid=4326,
            spatial_index=False,
        ),
        nullable=True,
    )

    created_at = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    __table_args__ = (
        Index(
            "idx_routes_start_location",
            "start_location",
            postgresql_using="gist",
        ),
        Index(
            "idx_routes_destination_location",
            "destination_location",
            postgresql_using="gist",
        ),
        Index(
            "idx_routes_geometry",
            "geometry",
            postgresql_using="gist",
        ),
    )