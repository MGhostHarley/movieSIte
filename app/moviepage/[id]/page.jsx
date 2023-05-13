"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import MoviePage from "@components/MoviePage";

const MyMoviePage = ({ params }) => {
  //   const { data: session } = useSession();
  const id = params.id;
  console.log(id, "id");
  const [myMovie, setMyMovie] = useState({});
  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `/api/searchmovie/${params.id.toString()}/`,
        {
          method: "GET",
        }
      );
      console.log(response, "resp");
      const data = await response.json();

      setMyMovie(data);
    };

    fetchMovie();
  }, [params.id]);
  console.log(params, "params");
  return (
    <MoviePage
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      movieData={myMovie}
      //   handleEdit={handleEdit}
      //   handleDelete={handleDelete}
    />
  );
};

export default MyMoviePage;
