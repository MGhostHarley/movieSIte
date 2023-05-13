export const GET = async (request, { params }) => {
  console.log(params, "PARAMS");
  const { id } = params;
  const str = JSON.stringify(params);
  console.log("id", " ID");
  console.log(`REQUESTS: ${str} ID: ${typeof str}`);

  const host = process.env.NEXT_PUBLIC_X_RapidAPI_Host;
  const url = `${host}/?i=${id}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RapidAPI_Key,
    },
  };
  console.log(url, " by id");
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      console.log(response, " resp");
      throw new Error("Network response was Failed");
    }

    const data = await response.json();
    console.log(data, " idata ");

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("There has been a problem with your fetch: ", error);
  }
};

// fetchPosts("avengers");
// http://localhost:3000/api/searchmovie/movie/tt0848228 4
