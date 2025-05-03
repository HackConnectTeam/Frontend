import { Outlet } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';

const MainLayout = ({ userId }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pb-16"> {/* pb-16 para dejar espacio para la barra inferior */}
        <Outlet /> {/* Esto renderizará las páginas hijas */}
      </main>
      <BottomNavigation userId={userId} />
    </div>
  );
};

export default MainLayout;
