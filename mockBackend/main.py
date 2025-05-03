from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from database import db
from models import Usuario, UsuarioCreate, Tag, Reto, RetoCreate, Post, PostCreate

app = FastAPI()

# Configuración CORS para desarrollo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Endpoints de Usuario
@app.post("/usuarios/", response_model=Usuario)
def crear_usuario(usuario: UsuarioCreate):
    nuevo_usuario = {
        "user_id": usuario.user_id,
        "rol": usuario.rol,
        "foto": usuario.foto,
        "puntos": 0,
        "fecha_registro": datetime.now(),
    }
    db["users"].append(nuevo_usuario)
    return nuevo_usuario


@app.get("/usuarios/", response_model=list[Usuario])
def listar_usuarios():
    return db["users"]


# Endpoints de Retos
@app.post("/retos/", response_model=Reto)
def crear_reto(reto: RetoCreate):
    nuevo_reto_id = max([r["reto_id"] for r in db["retos"]], default=0) + 1
    nuevo_reto = {
        "reto_id": nuevo_reto_id,
        "nombre": reto.nombre,
        "descripcion": reto.descripcion,
        "puntos": reto.puntos,
        "active": reto.active,
        "fecha_creacion": datetime.now(),
    }
    db["retos"].append(nuevo_reto)

    # Añadir relaciones con tags
    for tag_id in reto.tags:
        db["reto_tags"].append({"reto_id": nuevo_reto_id, "tag_id": tag_id})

    return nuevo_reto


@app.get("/retos/", response_model=list[Reto])
def listar_retos(active: bool = None):
    if active is not None:
        return [r for r in db["retos"] if r["active"] == active]
    return db["retos"]


# Endpoints de Posts
@app.post("/posts/", response_model=Post)
def crear_post(post: PostCreate):
    nuevo_post_id = max([p["post_id"] for p in db["posts"]], default=0) + 1
    nuevo_post = {
        "post_id": nuevo_post_id,
        "user_id": post.user_id,
        "reto_id": post.reto_id,
        "descripcion": post.descripcion,
        "foto": post.foto,
        "votos": 0,
        "fecha_creacion": datetime.now(),
        "aprobado": False,
    }
    db["posts"].append(nuevo_post)
    return nuevo_post


@app.get("/posts/", response_model=list[Post])
def listar_posts(aprobado: bool = None, user_id: str = None, reto_id: int = None):
    posts = db["posts"]

    if aprobado is not None:
        posts = [p for p in posts if p["aprobado"] == aprobado]
    if user_id is not None:
        posts = [p for p in posts if p["user_id"] == user_id]
    if reto_id is not None:
        posts = [p for p in posts if p["reto_id"] == reto_id]

    return posts


# Endpoints adicionales útiles
@app.get("/tags/", response_model=list[Tag])
def listar_tags():
    return db["tags"]


@app.get("/usuarios/{user_id}/tags/", response_model=list[Tag])
def obtener_tags_usuario(user_id: str):
    usuario_tags = [
        ut["tag_id"] for ut in db["usuario_tags"] if ut["user_id"] == user_id
    ]
    return [t for t in db["tags"] if t["tag_id"] in usuario_tags]
