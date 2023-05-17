import movieUser from "@models/user";
import { connectToDatabase } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    const user = await movieUser.find({ _id: params.id });

    if (!user) {
      return new Response("No user was found", { status: 404 });
    }

    const { bookmarked_movies, watched_movies } = user[0];

    return new Response(JSON.stringify({ bookmarked_movies, watched_movies }), {
      status: 200,
    });
  } catch (error) {
    return new Response(`Failed to connect to mongoDB. ERROR: ${error} `, {
      status: 500,
    });
  }
};
