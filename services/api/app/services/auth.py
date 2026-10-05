from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User
from app.core.security import hash_password, verify_password


def get_user_by_email(
    db: Session,
    email: str,
) -> User | None:

    result = db.execute(
        select(User).where(User.email == email)
    )

    return result.scalar_one_or_none()


def create_user(
    db: Session,
    email: str,
    name: str | None,
    password: str,
) -> User:

    user = User(
        email=email,
        name=name,
        password_hash=hash_password(password),
        role="USER",
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(
    db: Session,
    email: str,
    password: str,
) -> User | None:

    user = get_user_by_email(db, email)

    if not user:
        return None

    if not verify_password(
        password,
        user.password_hash,
    ):
        return None

    return user