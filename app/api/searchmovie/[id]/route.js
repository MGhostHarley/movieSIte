export const GET = async (request, { params }) => {
  const { id } = params;

  const host = process.env.NEXT_PUBLIC_X_RapidAPI_Host;
  const url = `${host}/?i=${id}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RapidAPI_Key,
    },
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Network response was Failed");
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("There has been a problem with your fetch: ", error);
  }
};
