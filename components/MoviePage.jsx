"use client";
import { useState } from "react";
import Image from "next/image";
import useMediaQuery from "@hooks/useMediaQuery";
import { useSession } from "next-auth/react";

const MoviePage = ({ name, desc, movieData }) => {
  const { data: session, status } = useSession();
  const [isBookmark, setIsBookmark] = useState(false);
  const [isWatchList, setIsWatchList] = useState(false);
  const isAboveLarge = useMediaQuery("(min-width: 1025px)");
  let toWrap = " ";

  if (isAboveLarge) {
    toWrap = " ";
  } else {
    toWrap = "flex-wrap ";
  }

  const updateBookmarks = async (params) => {
    const response = await fetch(`/api/users/updateBookmarks`, {
      method: "POST",
      body: JSON.stringify(params),
    });
    const data = await response.json();
    return data;
  };

  const handleBookmarkCheckbox = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;

    if (status !== "authenticated") {
      alert(`You must be logged in to bookmark a movie`);
      event.target.checked = false;
      return;
    }

    const params = {
      id: session.user.id,
      movie: movieData,
      state: checked,
      type: "bookmark",
      email: session.user.email,
    };
    const success = updateBookmarks(params, checked);
    setIsBookmark(!isBookmark);
  };

  const handleWatchListCheckbox = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;

    if (status !== "authenticated") {
      alert(`You must be logged in to bookmark a movie`);
      event.target.checked = false;
      return;
    }

    const params = {
      id: session.user.id,
      movie: movieData,
      state: checked,
      type: "watchList",
      email: session.user.email,
    };
    const success = updateBookmarks(params, checked);
    setIsWatchList(!isWatchList);
  };
  return (
    <>
      {" "}
      <h1 className="movie_text text-center pb-10">{movieData.Title}</h1>
      <section
        id="home"
        className={`${toWrap} md:flex md:justify-between md:items-center gap-4  py-5 -mt-5`}
      >
        {" "}
        <div className=" mt-1 md:mt-1 flex flex-row  justify-center ">
          <div className="">
            {isAboveLarge ? (
              <div className="relative background-size:100%">
                <Image
                  loading="lazy"
                  src={movieData.Poster}
                  alt="user_image"
                  width={400}
                  height={400}
                  quality={100}
                  placeholder="blur"
                  blurDataURL="./public/assets/images/grid.svg"
                  className="  z-10 rounded-2xl border-2 border-[#24CBFF]"
                  sizes="(max-width: 768px) 50vw 50vh, (max-width: 1200px) 100vw"
                />
              </div>
            ) : (
              <Image
                src={movieData.Poster}
                alt="user_image"
                width={300}
                height={300}
                quality={100}
                loading="lazy"
                className="z-10  w-64 rounded-2xl"
                blurDataURL="./public/assets/images/grid.svg"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw"
                placeholder="blur"
              />
            )}
          </div>
        </div>
        <div className="max-sm:pt-6 max-sm:pb-3">
          <div className=" flex flex-col justify-center flex-none w-64 h-64 bg-gray-300 border-2 border-amber-600 p-5 object-contain rounded-2xl">
            <h2 className="font-satoshi font-bold text-sky-600 text-[30px]">
              {" "}
              Quick Hits <br />
            </h2>
            <ul className="list-disc leading-relaxed">
              <li className="font-inter font-bold text-black-500 ">
                Release Date:{" "}
                <span className="font-medium">{movieData.Released}</span>
              </li>
              <li className="font-inter font-bold text-black-500">
                Runtime:{" "}
                <span className="font-medium">{movieData.Released}</span>
              </li>
              <li className="font-inter font-bold text-black-500">
                Genre: <span className="font-medium">{movieData.Genre}</span>
              </li>
              <li className="font-inter font-bold text-black-500">
                Director:{" "}
                <span className="font-medium">{movieData.Director}</span>
              </li>
              <li className="font-inter font-bold text-black-500">
                Rated: <span className="font-medium">{movieData.Rated}</span>
              </li>
              <li className="font-inter font-bold text-black-500">
                Movie Type:{" "}
                <span className="font-medium">{movieData.Type}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-sm:pt-3 max-sm:pb-3">
          <div className=" flex flex-col justify-center flex-none w-64 h-64 bg-gray-300 border-2 border-amber-600 p-5 object-contain rounded-2xl">
            <h2 className="font-satoshi font-bold text-sky-600 text-[30px]">
              {" "}
              Plot <br />
            </h2>
            <p>{movieData.Plot}</p>
          </div>
        </div>
        <div className="max-sm:pt-3 max-sm:pb-3">
          <div className=" flex flex-col justify-center flex-none w-64 h-64 bg-gray-300 border-2 border-amber-600 p-5 object-contain rounded-2xl">
            <h2 className="font-satoshi font-bold text-sky-600 text-[30px]">
              {" "}
              Critic Scores <br />
            </h2>
            <p className="font-inter font-bold text-black-500">
              Metascore:{" "}
              <span className="text-red-600"> {movieData.Metascore}</span>
            </p>
            <p className="font-inter font-bold text-black-500">
              imdbRating:{" "}
              <span className="text-red-600"> {movieData.imdbRating}</span>
            </p>
          </div>
        </div>
        <div className="mt-5 flex-col gap-4 border-t border-gray-100 pt-3">
          <div className="flex clear-right items-center mb-4">
            <input
              id="bookmarked?"
              type="checkbox"
              value=""
              onClick={handleBookmarkCheckbox}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            ></input>
            <label
              for="bookmarked?"
              className="ml-2 text-sm font-medium text-sky-500 dark:text-sky-700"
            >
              bookmarked?
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="watched?"
              type="checkbox"
              value=""
              onClick={handleWatchListCheckbox}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            ></input>
            <label
              for="watched?"
              className="ml-2 text-sm font-medium text-green-500 dark:text-green-700"
            >
              watched?
            </label>
          </div>
        </div>
      </section>
    </>
  );
};

export default MoviePage;
