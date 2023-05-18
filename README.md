## Features on site:

Below is a list of features currently available.

- Bookmarking a movie
- Marking a movie as watched
- Searching a movie by title
- Creating an account/authentication
- Copying the name of movie
- Navigating to user profile page where you can see bookmarked/watched movies
- Navigating to movie page (by clicking) where you can see additional info about movie

### Front End Deep Dive

As requested, I did the front end in Next.js 13. Initially, it was very new to me (I have a more traditional Node.js/Express background) and so it took a little bit to get use to the API folder structure. However, once I got into the groove of it I was impress with just how much *easier* it was to set up APIs in Next.js. The folder structure let me rapidly create, teardown and change APIs on the fly with out having to switch context between my React app and backend. And the features that came out of the box with Next.js, such as authentication and and `useSession` hook was incredibly easy to use. Finally, Vercel made deploying a breeze.


For the UI development, I decided to keep it relatively simple. I went with tailwind as it gave me the ability to rapidly iterate and I was pretty familiar with it. Tailwind also allowed me to pretty easily make the site **mobile** responsive.

### Back End Deep Dive

Because Next.js does sever side rendering coupled with the frontend, I didn't really have to do a sperate dev process for frontend vs backend like I do for most projects. 

For the movie api, I used a pretty poular open source movie library from RapidAPi. For my database solution, I decided to take the time to brush on my mongo skills and thought this project would be great for a document database as we really dont have any complex relationships between users.

## Future Changes 

Below I talk about what changes I would make to the application with more time.

### Code Changes

The first change I would like to explore is adding appropriate error handling. Currently, there are minimal checks, and almost no unit/acceptance testing. Currently, none of the api routes our being tested, and I think that is critical to ensuring quality. I ran out of time and would love to go back to do comprehensive testing.

The next thing I would like to change is implementing Typescript for type safely. I initially attempted to set up the project in typescript, but it didn't seem to play nice with Next.js 13 (though, I am using some features that are still in testing) Finally, I need to refactor the code as it is a bit of a mess.

Finally, I would like to do a UI redesign. I'm pretty happy with the home page, but the movie and profile page has very basic formatting and is pretty forgettable.

### Features to add

While I am happy with the features developed, below are some ideas of features that I would like to add to bolster the site.

- Authentication by other services/not just Google (e.g. email, Facebook, twitter)
- Visual indicator that when something is bookmarked/watched, it has been added
- When loading searching a movie, checking if it's already been bookmarked and indicating it
- Allowing for search/filtering on fields like Actors, genres, directors, plot summary
- Better fuzzy matching for search
- A way to add personal notes and ratings to bookmarked movies
- Allow any user to comment on a movies page.
- Allowing users to toggle between light and dark themes

## Summary

All in all, this was a fun project that allowed me to try a new framwork in Next.js 13 and Vercel. I had a blast and was thoroughly impressed with how easy it was to implement some core features. I look forward to using Next.js in more of my future projects.