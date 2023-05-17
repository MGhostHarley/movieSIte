export const getMovies = async (title) => {
  const host = process.env.NEXT_PUBLIC_X_RapidAPI_Host;

  const url = `${host}/?s=${title}`;

  if (!title) return;

  const options = {
    method: "GET",
    headers: {
      //   X_RapidAPI_Key: process.env.NEXT_PUBLIC_X_RapidAPI_API,
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RapidAPI_Key,
    },
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Network response was Failed");
    }

    const data = await response.json();

    return data?.Search;
  } catch (error) {
    console.error("There has been a problem with your fetch: ", error);
  }
};

// fetchPosts("avengers");
