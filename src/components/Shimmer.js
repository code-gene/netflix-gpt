const Shimmer = () => {
  return (
    <div className="relative bg-gray-800 shadow-md m-2 p-2 w-[180px] rounded-lg animate-pulse">
      <div className="w-full h-48 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg mb-4"></div>
      <div className="w-3/4 h-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-md"></div>
    </div>
  );
};

export default Shimmer;
