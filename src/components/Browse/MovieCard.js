import { Link } from "react-router-dom";
import { IMG_CDN_URL } from "../../utils/constants";


const MovieCard = ({ posterPath, id}) => {
  if (!posterPath) return;

  return (
    <div className="w-36 md:w-48 pr-4 transform transition-transform hover:scale-105">
      <Link to={"/browse/" + id}>
        <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
      </Link>
    </div>
  );
};
export default MovieCard;

