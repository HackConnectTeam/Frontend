# Base de datos mock
db = {
    "users": [
        {
            "user_id": "qr123",
            "rol": "admin",
            "foto": "https://example.com/user1.jpg",
            "puntos": 100,
            "fecha_registro": "2024-01-01T00:00:00",
        }
    ],
    "tags": [
        {"tag_id": 1, "nombre": "Python"},
        {"tag_id": 2, "nombre": "React"},
        {"tag_id": 3, "nombre": "IoT"},
    ],
    "retos": [
        {
            "reto_id": 1,
            "nombre": "Primer Reto",
            "descripcion": "Crea tu primer proyecto",
            "puntos": 50,
            "active": True,
            "fecha_creacion": "2024-01-01T00:00:00",
        }
    ],
    "posts": [
        {
            "post_id": 1,
            "user_id": "qr123",
            "reto_id": 1,
            "descripcion": "Mi primer post",
            "foto": "https://example.com/post1.jpg",
            "votos": 5,
            "fecha_creacion": "2024-01-02T00:00:00",
            "aprobado": True,
        }
    ],
    "usuario_tags": [
        {"user_id": "qr123", "tag_id": 1},
        {"user_id": "qr123", "tag_id": 2},
    ],
    "reto_tags": [{"reto_id": 1, "tag_id": 1}, {"reto_id": 1, "tag_id": 2}],
}
