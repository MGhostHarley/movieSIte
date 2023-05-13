"use client";
import Link from "next/link";

import { useState, useEffect } from "react";
import { getMovies } from "@utils/getMovies";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data }) => {
  console.log(data, "datata");

  return data ? (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.imdbID} post={post} />
      ))}
    </div>
  ) : (
    <h1 className="font-bold text-red-600 text-[30px]">
      No movie was found with that title
    </h1>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [submitting, setIsSubmitting] = useState(false);

  // const fetchPosts = async () => {
  //   const response = await fetch("/api/prompt");
  //   const data = await response.json();

  //   setAllPosts(data);
  // };

  // };
  const fetchMovies = async () => {
    const data = await getMovies(searchText);
    setAllPosts(data);
  };

  console.log(allPosts, " allposts");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    console.log(searchText, "bin change");
  };

  const keyEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      setSearchText(event.target.value);
      fetchMovies();
      console.log(searchText, "Moo");
    }
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={keyEnter}
          required
          className="search_input peer"
        />
      </form>
      <div className="flex mx-3 mb-5 gap-4">
        <button
          onClick={fetchMovies}
          type="submit"
          disabled={submitting}
          className="px-5 py-3 text-sm bg-sky-500 rounded-full text-white"
        >
          {submitting ? `Loading for ${searchText}...` : "Search Movie"}
        </button>
      </div>

      {/* All Prompts */}

      <PromptCardList data={allPosts} />
    </section>
  );
};

export default Feed;
