import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useRef } from "react";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  const iframeRef = useRef(null);

  const handleVideoEnd = () => {
    iframeRef.current.contentWindow.location.reload();
  };

  return (
    <div>
      <iframe
        className="w-screen aspect-[5/3]"
        ref={iframeRef}
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1&loop=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        onEnded={handleVideoEnd}
      ></iframe>
    </div>
  );
};

export default VideoBackground;
