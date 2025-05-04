import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar';

const Header = ({ userId }) => {
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-primary text-white p-4 shadow-md flex items-center justify-between relative z-50">
        <div className="bg-white p-2 rounded">
          <img src="/LogoTitulo.png" alt="Logo" className="mx-auto h-10" />
        </div>

        {userId && (
          <button
            onClick={() => navigate(`/user/${userId}/edit`)}
            className="p-2 bg-transparent border-none focus:outline-none z-50 flex items-center"
            aria-label="Profile Button"
          >
            <Avatar userId={userId} />
          </button>
        )}
      </header>
    </>
  );
};

export default Header;
