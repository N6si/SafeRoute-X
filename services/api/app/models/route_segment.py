import uuid

from geoalchemy2 import Geometry
from sqlalchemy import Float, Integer, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class RouteSegment(Base):
    __tablename__ = "route_segments"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    route_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("routes.id"),
        nullable=False,
    )

    sequence: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    geometry = mapped_column(
        Geometry(
            "LINESTRING",
            srid=4326,
            spatial_index=False,
        ),
        nullable=False,
    )

    distance_meters: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    __table_args__ = (
        Index(
            "idx_route_segments_geometry",
            "geometry",
            postgresql_using="gist",
        ),
    )