import mongoose from "mongoose";

let isConnected = false;
export const connectToDatabase = async () => {
  console.log(mongoose.connection.models, "MODELS");

  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB already has a connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "movie_site",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB connection established");
  } catch (error) {
    console.log("Mongo DB connection failed. ERROR: ", error);
  }
};
