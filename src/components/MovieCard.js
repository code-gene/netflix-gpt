import { IMG_CDN_URL } from "../utils/constants";


const MovieCard = ({ posterPath, movie}) => {
  if (!posterPath) return;

  const showMovieTrailer = () => {
    console.log(movie);
  }

  return (
    <div className="w-36 md:w-48 pr-4 transform transition-transform hover:scale-105" onClick={showMovieTrailer}>
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};
export default MovieCard;

