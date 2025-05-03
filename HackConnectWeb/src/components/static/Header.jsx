const Header = ({ userId }) => {
    return (
      <header className="bg-primary text-white p-4 shadow-md flex items-center justify-between relative">

        <div className="bg-white p-2 rounded">
            <img src="/public/LogoTitulo.png" alt="Logo" className="mx-auto h-10" />

        </div>


        {userId && (
          <button
            className="p-2 bg-transparent border-none focus:outline-none"
            aria-label="Menú"
          >
            <div className="w-6 h-0.5 bg-white mb-1" />
            <div className="w-6 h-0.5 bg-white mb-1" />
            <div className="w-6 h-0.5 bg-white" />
          </button>
        )}
      </header>
    );
  };

  export default Header;
