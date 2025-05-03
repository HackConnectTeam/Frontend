import Participation from './Participation';

const ParticipationList = () => {
  const participations = [
    {
      id: 1,
      userName: "Laura González",
      userImage: "/images/users/laura.jpg",
      challengeImage: "/images/challenges/ia.jpg",
    },
    {
      id: 2,
      userName: "Carlos Méndez",
      userImage: "/images/users/carlos.jpg",
      challengeImage: "/images/challenges/energia.jpg",
    },
    {
      id: 3,
      userName: "María Torres",
      userImage: "/images/users/maria.jpg",
      challengeImage: "/images/challenges/hackeo.jpg",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
      {participations.map((item) => (
        <Participation
          key={item.id}
          userName={item.userName}
          userImage={item.userImage}
          challengeImage={item.challengeImage}
        />
      ))}
    </div>
  );
};

export default ParticipationList;
