"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleMovieClick = () => {
    console.log(post);

    router.push(`/moviepage/${post.imdbID}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

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
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.Type}
      </p>

      {/* Check to make sure on profile page before showing edit */}
      {/* {session?.user.id === post.creator._id && pathName === "/profile" && ( */}
      <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
        <div className="flex items-center mb-4">
          <input
            id="bookmarked?"
            type="checkbox"
            value=""
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
