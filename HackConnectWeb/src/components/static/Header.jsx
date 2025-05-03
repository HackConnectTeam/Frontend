import { useNavigate } from 'react-router-dom';
import profile from '../../assets/icons/profile.svg';

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
            className="p-2 bg-transparent border-none focus:outline-none z-50"
            aria-label="Profile Button"
          >
            <img
              src={profile}
              alt="Profile"
              className="h-8 w-8 rounded-full border-2 border-white"
            />
          </button>
        )}
      </header>
    </>
  );
};

export default Header;
