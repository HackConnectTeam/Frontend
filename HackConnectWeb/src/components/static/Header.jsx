const Header = ({ userId }) => {
    return (
      <header className="bg-primary text-white p-4 shadow-md flex items-center justify-between">
        <h1 className="text-xl font-bold text-center w-full">
          {userId ? "Bienvenido a HackConnect" : "Escáner QR"}
        </h1>

        {userId && (
          <button
            className="right-4 top-4 p-2 rounded-full hover:bg-white/20 transition"
            aria-label="Opciones"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>
        )}
      </header>
    );
  };

  export default Header;
