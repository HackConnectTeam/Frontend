import { useNavigate } from 'react-router-dom';

const ChallengeCard = ({ title, description, navigateTo, isCompleted}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) navigate(navigateTo);
  };

  return (
    <div
      onClick={handleClick}
      className={`shadow-md rounded-2xl p-6 max-w-md cursor-pointer transition hover:shadow-lg
        ${isCompleted ? 'bg-green-100 border-green-400 border' : 'bg-surface text-text-main'}`}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-text-subtle">{description}</p>
    </div>
  );
};

export default ChallengeCard;
