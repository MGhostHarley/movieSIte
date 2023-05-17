"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();

  const [myMovies, setMyMovies] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `/api/users/${session?.user.id}/savedMovies`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      setMyMovies(data);
    };

    if (session?.user.id) fetchMovies();
  }, [session?.user.id]);

  return (
    <div>
      <div>
        {myMovies.bookmarked_movies ? (
          <Profile
            name="My"
            desc="Welcome to your profile page. View your bookmarked and watched movies"
            data={myMovies.bookmarked_movies}
            type="bookmarks"
            bookmarkChecked={true}
          />
        ) : (
          <Profile
            name="My"
            desc="Welcome to your profile page. View your bookmarked and watched movies"
            data={["hello"]}
            type="bookmarks"
            bookmarkChecked={false}
          />
        )}
      </div>
      <div>
        {myMovies.watched_movies ? (
          <Profile
            name="My"
            desc="Welcome to your profile page. View your bookmarked and watched movies"
            data={myMovies.watched_movies}
            type="watched movies"
            watchedChecked={true}
          />
        ) : (
          <Profile
            name="My"
            desc="Welcome to your profile page. View your bookmarked and watched movies"
            data={["hello"]}
            type="watched movies"
            saved={false}
          />
        )}
      </div>
    </div>
  );
};

export default MyProfile;
