import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { API_OPTIONS } from '../../utils/constants';

const MovieDetails = () => {

    const { movieId } = useParams();
    const [movies, setMovies] = useState(null);
    const [video, setVideo] = useState(null);
    
    useEffect(() => {
      fetchMovies();
      fetchMovieVideo();
    }, []);

    const fetchMovies = async () => {
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/" + movieId + "?language=en-US",
          API_OPTIONS
        );
        const json = await data.json();
        console.log(json);
        setMovies(json);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchMovieVideo = async () => {
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/" +
            movieId +
            "/videos?language=en-US",
          API_OPTIONS
        );
        const json = await data.json();
        console.log(json);

        const filterData = json.results.filter(
          (video) =>
            video.type === "Trailer" ||
            video.type === "Official Trailer" ||
            video.type === "Teaser" ||
            video.type === "Featurette" ||
            video.type.toLowerCase().includes("trailer")
        );

        console.log(filterData);

        setVideo(json.results[0]);
        // setVideo(filterData);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <>
      <div className="hidden md:mt-[10px]  md:block">
        <div className="w-screen -mt-24 absolute aspect-video hidden md:block">
          <iframe
            className=""
            width="100%"
            height="100%"
            src={
              "https://www.youtube.com/embed/" +
              video?.key +
              "?autoplay=1&mute=1"
            } //
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullscreen
          ></iframe>
        </div>
      </div>
      <div className="absolute hidden md:block top-[0px] h-screen w-screen bg-gradient-to-r from-black">
        <div className="text-white absolute ml-14 top-[250px] ">
          <h1 className="font-semiboldbold text-6xl">{movies?.title}</h1>
          <p className="mt-2 w-[60%]">{movies?.overview}</p>
          <div className="flex ml-[-15px] mt-6">
            {movies?.genres?.map((genre) => {
              return (
                <p
                  key={genre?.id}
                  className="rounded-full ml-2 px-4 py-2 bg-brand-charcoal text-white"
                >
                  {genre?.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetails
