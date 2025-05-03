import { useNavigate } from 'react-router-dom';

const ChallengeCard = ({ title, description, navigateTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) navigate(navigateTo);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-surface shadow-md rounded-2xl p-6 max-w-md text-text-main cursor-pointer hover:shadow-lg transition"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-text-subtle">{description}</p>
    </div>
  );
};

export default ChallengeCard;
