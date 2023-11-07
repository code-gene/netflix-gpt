import { useSelector } from "react-redux";
import MovieList from "../Browse/MovieList";
import Shimmer from "../Shimmer";

const ShimmerLoader = () => (
  <div className="flex flex-wrap justify-center p-2 m-2 bg-black text-white bg-opacity-90">
    <Shimmer />
    <Shimmer />
    <Shimmer />
    <Shimmer />
    <Shimmer />
    <Shimmer />
    <Shimmer />
    <Shimmer />
    <Shimmer />
    <Shimmer />
    <Shimmer />
  </div>
);

const GptMovieSuggestions = () => {
  
  const { movieResults, movieNames, isGptSearching } = useSelector(
    (store) => store.gpt
  );

  console.log("isGptSearching", isGptSearching);
  if (isGptSearching) return (<ShimmerLoader></ShimmerLoader>);
  if (movieResults == null || movieNames == null) return;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};
export default GptMovieSuggestions;
