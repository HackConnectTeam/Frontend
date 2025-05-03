import { NavLink, useParams } from 'react-router-dom';
import challengesIcon from '../assets/icons/challenges.svg';
import scoreboardIcon from '../assets/icons/scoreboard.svg';
import projectsIcon from '../assets/icons/projects.svg';

const BottomNavigation = ({ userId }) => {
  const params = useParams();
  const finalUserId = userId || params.userId;

  if (!finalUserId) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface shadow-lg border-t border-gray-200">
      <div className="flex justify-around">
        <NavLink
          to={`/user/${finalUserId}/scoreboard`}
          className={({ isActive }) =>
            `flex flex-col items-center py-3 px-4 ${isActive ? 'text-primary' : 'text-text-main'}`
          }
        >
          <img src={scoreboardIcon} alt="Scoreboard" className="w-6 h-6" />
          <span className="text-xs mt-1">Scoreboard</span>
        </NavLink>
        <NavLink
          to={`/user/${finalUserId}/challenges`}
          className={({ isActive }) =>
            `flex flex-col items-center py-3 px-4 ${isActive ? 'text-primary' : 'text-text-main'}`
          }
        >
          <img src={challengesIcon} alt="Challenges" className="w-6 h-6" />
          <span className="text-xs mt-1">Challenges</span>
        </NavLink>
        <NavLink
          to={`/user/${finalUserId}/projects`}
          className={({ isActive }) =>
            `flex flex-col items-center py-3 px-4 ${isActive ? 'text-primary' : 'text-text-main'}`
          }
        >
          <img src={projectsIcon} alt="Projects" className="w-6 h-6" />
          <span className="text-xs mt-1">Projects</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavigation;
