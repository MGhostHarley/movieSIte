import movieUser from "@models/user";
import { connectToDatabase } from "@utils/database";
import { Types } from "mongoose";

const checkRecordExist = async (userId, movie, type, email) => {
  let query;
  const mongoId = new Types.ObjectId(userId);
  if (type === "bookmark") {
    query = {
      email: email,
      "bookmarked_movies.imdbID": movie.imdbID,
    };
  }

  if (type === "watchList") {
    query = {
      email: email,
      "watched_movies.imdbID": movie.imdbID,
    };
  }
  const userRecord = await movieUser.find(query);
  if (userRecord.length === 0) {
    return false;
  }
  return true;
};

const createInsertQuery = (userId, movie, type, email) => {
  if (type === "bookmark") {
    return {
      filter: { _id: new Types.ObjectId(userId) },
      value: { $push: { bookmarked_movies: movie } },
    };
  }

  if (type === "watchList") {
    return {
      filter: { _id: new Types.ObjectId(userId) },
      value: { $push: { watched_movies: movie } },
    };
  }
};

const createDeleteQuery = (userId, movie, type) => {
  if (type === "bookmark") {
    return {}, { $pull: { bookmarked_movies: { imdbID: movie.imdbID } } };
  }

  if (type === "watchList") {
    return {}, { $pull: { watched_movies: { imdbID: movie.imdbID } } };
  }
};

export async function POST(request) {
  const req = await request.json();
  const { id: userId, movie, state, type, email } = req;

  try {
    await connectToDatabase();

    // if status is true:
    //  .find(movieID) to see if already bookmarked. If it is, do nothing. return 200 - already bookmarked
    //  If not bookmarked, add it to the bookmarks array. return 200 - bookmarked

    // if status is false :
    //  .find(movieID) to see if already bookmarked. If it is, remove it. return 200 - removed bookmarked
    //  If not bookmarked, do nothing. return 200 - bookmarked

    const recordExists = await checkRecordExist(userId, movie, type, email);

    if (state) {
      if (recordExists) {
        return new Response("Bookmark already exists", { status: 200 });
      }

      const addQuery = createInsertQuery(userId, movie, type, email);

      const updated = await movieUser.updateOne(
        addQuery.filter,
        addQuery.value
      );
      return new Response(
        JSON.stringify({ message: `The movie ${movie} has been bookmarked` }),
        {
          status: 200,
        }
      );
    }

    if (!recordExists) {
      return new Response("Bookmark does not exists", { status: 200 });
    }

    const deleteQuery = createDeleteQuery(userId, movie, type);

    const updated = await movieUser.updateMany(deleteQuery);
    return new Response(
      JSON.stringify({ message: "The Delete was successful" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(`Failed to update user. ERROR: ${error}`, {
      status: 500,
      error: error,
    });
  }
}
