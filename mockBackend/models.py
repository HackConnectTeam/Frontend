from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Usuario(BaseModel):
    user_id: str
    rol: str
    foto: str
    puntos: int
    fecha_registro: datetime


class UsuarioCreate(BaseModel):
    user_id: str
    rol: str = "usuario"
    foto: str = ""


class Tag(BaseModel):
    tag_id: int
    nombre: str


class Reto(BaseModel):
    reto_id: int
    nombre: str
    descripcion: str
    puntos: int
    active: bool
    fecha_creacion: datetime


class RetoCreate(BaseModel):
    nombre: str
    descripcion: str
    puntos: int
    active: bool = True
    tags: list[int] = []


class Post(BaseModel):
    post_id: int
    user_id: str
    reto_id: int
    descripcion: str
    foto: Optional[str] = None
    votos: int = 0
    fecha_creacion: datetime
    aprobado: bool = False


class PostCreate(BaseModel):
    user_id: str
    reto_id: int
    descripcion: str
    foto: Optional[str] = None
