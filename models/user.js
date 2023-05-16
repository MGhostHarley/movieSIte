import { Schema, model, models } from "mongoose";

const movieSchema = new Schema({
  Title: { type: String, required: [true, "Need Title"] },
  Year: { type: String, required: [true, "Need Year"] },
  imdbID: { type: String, required: [true, "Need IMBDID"] },
  Type: { type: String, required: [true, "Need Type"] },
  Poster: { type: String, required: [true, "Need Poster"] },
});

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
    },
    username: {
      type: String,
      required: [true, "Username is required!"],
      match: [
        /^(?=.{7,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        "Username invalid. Must be an 7-20 alphanumeric letters and be unique!",
      ],
    },
    image: {
      type: String,
    },
    bookmarked_movies: { type: [movieSchema], default: [] },
    watched_movies: { type: [movieSchema], default: [] },
  },
  { collection: "movie_users" }
);

const movieUser = models.movieUser || model("movieUser", UserSchema);

export default movieUser;
