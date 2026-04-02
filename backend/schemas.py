from fastapi import FastAPI
from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
class LoginRequest(BaseModel):
    email: str
    password: str
class TodoCreate(BaseModel):
    title: str
class TodoResponse(BaseModel):
    id: int
    title: str
    completed: bool
class Target(BaseModel):
    id: int
    