from app.security.auth import *

password = "hello123"

hashed = hash_password(password)

print(hashed)

print(
    verify_password(
        password,
        hashed
    )
)