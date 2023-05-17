"use client";

import { useEffect, useState } from "react";

import MoviePage from "@components/MoviePage";

const MyMoviePage = ({ params }) => {
  const id = params.id;
  const [myMovie, setMyMovie] = useState({});
  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `/api/searchmovie/${params.id.toString()}/`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      setMyMovie(data);
    };

    fetchMovie();
  }, [params.id]);
  return (
    <MoviePage
      name="My"
      desc="Welcome to your personalized profile page. Store your bookmarked and watched movies for later viewing"
      movieData={myMovie}
    />
  );
};

export default MyMoviePage;
