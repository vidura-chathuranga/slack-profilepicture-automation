const CurrentProfile = ({ imageURL }) => {
  return (
    <div className="w-[300px] h-[300px] border-4 border-solid border-white rounded-full">
      <img src={imageURL} alt="current profile picture"  className="w-full object-contain rounded-full"/>
    </div>
  );
};

export default CurrentProfile;
