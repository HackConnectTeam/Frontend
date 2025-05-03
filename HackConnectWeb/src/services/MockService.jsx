// Añadir usuario
export const addUser = async () => {
    const response = await fetch('http://localhost:8000/usuarios/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 'qr456',
        rol: 'usuario',
        foto: ''
      })
    });
    return await response.json();
  };

  // Listar retos activos
  export const getActiveChallenges = async () => {
    const response = await fetch('http://localhost:8000/retos/?active=true');
    return await response.json();
  };

 // Añadir post
 export const addPost = async () => {
    const response = await fetch('http://localhost:8000/posts/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 'qr123',
        reto_id: 1,
        descripcion: 'Mi participación en el reto',
        foto: 'https://example.com/mipost.jpg'
      })
    });
    return await response.json();
  };
