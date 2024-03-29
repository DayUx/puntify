import os
from typing import Annotated

import motor.motor_asyncio
from fastapi import Header, HTTPException, status
from jose import JWTError, jwt
from bson import ObjectId


MONGO_URL=os.getenv("MONGO_URL") or "mongodb://localhost:27017"
SECRET_KEY=os.getenv("SECRET_KEY") or "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM=os.getenv("ALGORITHM") or "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES") or 1440


client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
db = client.dlisfy

async def isAdmin(x_token: str = Header("X-Token")):
    credentials_exception = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(x_token, SECRET_KEY, algorithms=ALGORITHM)
        user = await db.user.find_one({"_id":ObjectId(payload.get("sub"))})
        if user is None:
            raise credentials_exception
        if user["admin"] is False:
            raise credentials_exception
        return user
    except JWTError:
        raise credentials_exception


async def getUser(id: str):
    user = await db.user.find_one({"_id": id})
    if user:
        return user


async def isTokenValid(x_token: str = Header("X-Token")):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(x_token, SECRET_KEY, algorithms=["HS256"])
        user = await db.user.find_one({"_id": ObjectId(payload.get("sub"))})
        if user is None:
            raise credentials_exception
        return user
    except JWTError:
        raise credentials_exception
