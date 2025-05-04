const Participation = ({ userName, userImage }) => {
  return (
    <div className="bg-surface rounded-2xl shadow-md p-4 max-w-md w-full">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
          <img
            src={userImage}
            alt="Foto de perfil"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-text-main text-lg">
          <span className="text-text-main font-semibold text-lg">{userName}</span> has completed the challenge!
        </p>
      </div>
    </div>
  );
};

export default Participation;
