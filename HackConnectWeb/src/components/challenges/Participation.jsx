const Participation = () => {
    return (
      <div className="bg-surface rounded-2xl shadow-md p-4 max-w-md w-full">
        {/* Usuario */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
            <img
              src="/placeholder-user.png" // imagen por defecto
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-text-main font-semibold text-lg">Nombre del Usuario</h3>
          </div>
        </div>

        {/* Imagen del reto */}
        <div className="w-full rounded-xl overflow-hidden">
          <img
            src="/placeholder-challenge.jpg" // imagen por defecto del reto
            alt="Imagen del reto"
            className="w-full h-48 object-cover"
          />
        </div>
      </div>
    );
  };

  export default Participation;
