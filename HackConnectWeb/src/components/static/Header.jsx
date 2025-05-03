import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ userId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: '🏠 Home', path: `/user/${userId}` },
    { label: '📄 Datos', path: `/user/${userId}/edit` },
    { label: '🏆 Scoreboard', path: `/user/${userId}/scoreboard` },
  ];

  // Cerrar menú con Escape
  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', escHandler);
    return () => document.removeEventListener('keydown', escHandler);
  }, []);

  return (
    <>
      <header className="bg-primary text-white p-4 shadow-md flex items-center justify-between relative z-50">
        <div className="bg-white p-2 rounded">
          <img src="/LogoTitulo.png" alt="Logo" className="mx-auto h-10" />
        </div>

        {userId && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 bg-transparent border-none focus:outline-none z-50"
            aria-label="Toggle menú"
          >
            <div className="w-6 h-0.5 bg-white mb-1" />
            <div className="w-6 h-0.5 bg-white mb-1" />
            <div className="w-6 h-0.5 bg-white" />
          </button>
        )}
      </header>

      {menuOpen && (
        <div className="fixed inset-0 bg-primary text-white z-40 flex flex-col items-center justify-center">
          <div className="w-full max-w-xs text-center">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
                className={`w-2/3 text-xl font-medium py-4 bg-transparent rounded-none ${
                  index !== menuItems.length - 1 ? 'border-b border-b-white' : ''
                } hover:bg-primary/80 transition`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
