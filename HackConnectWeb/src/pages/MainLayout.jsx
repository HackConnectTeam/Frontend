import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import BottomNavigation from '../components/BottomNavigation';

const MainLayout = ({ userId }) => {
  const navigate = useNavigate();
  const params = useParams();
  const finalUserId = userId || params.userId;

  useEffect(() => {
    // If we are on the base route (/user/:userId), redirect to challenges
    if (window.location.pathname === `/user/${finalUserId}`) {
      navigate(`/user/${finalUserId}/challenges`, { replace: true });
    }
  }, [finalUserId, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pb-16">
        <Outlet />
      </main>
      <BottomNavigation userId={userId} />
    </div>
  );
};

export default MainLayout;
