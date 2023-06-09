"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PromptCard = ({ post, bookmarkChecked, watchedChecked }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // ######################## STATE ########################
  const [copied, setCopied] = useState("");
  const [isBookmark, setIsBookmark] = useState(
    bookmarkChecked === undefined ? false : bookmarkChecked
  );
  const [isWatchList, setIsWatchList] = useState(
    watchedChecked === undefined ? false : watchedChecked
  );
  // ######################## FUNCTIONS ########################
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
      movie: post,
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
      movie: post,
      state: checked,
      type: "watchList",
      email: session.user.email,
    };
    const success = updateBookmarks(params, checked);
    setIsWatchList(!isWatchList);
  };

  const handleMovieClick = () => {
    router.push(`/moviepage/${post.imdbID}`);
  };

  const handleCopy = () => {
    setCopied(post.Title);
    navigator.clipboard.writeText(post.Title);
    setTimeout(() => setCopied(false), 3000);
  };

  // ######################## COMPONENT ########################
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleMovieClick}
        >
          <Image
            src={post.Poster}
            alt="user_image"
            width={130}
            height={130}
            className="rounded-2xl object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.Title}
            </h3>
            <p className="font-inter text-sm text-gray-500">{post.Year}</p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.Title
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.Title ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.Title}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.Type}
      </p>

      <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
        <div className="flex items-center mb-4">
          <input
            id="bookmarked?"
            type="checkbox"
            value=""
            checked={isBookmark}
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
            checked={isWatchList}
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
      {/* )} */}
    </div>
  );
};

export default PromptCard;
