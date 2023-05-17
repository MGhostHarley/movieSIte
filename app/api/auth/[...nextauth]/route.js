// DOCUMENTATION: https://next-auth.js.org/getting-started/example

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDatabase } from "@utils/database";
import movieUser from "@models/user";

function getRandom(length) {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );
}
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await movieUser.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDatabase();

        // check if user already exists
        const userExists = await movieUser.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        const idToken = getRandom(3);
        if (!userExists) {
          await movieUser.create({
            email: profile.email,
            username: profile.name.replaceAll(" ", "").toLowerCase() + idToken,
            image: profile.picture,
            bookmarked_movies: [],
            watched_movies: [],
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
