# My Movie Collection

My Movie Collection - is a web application, where consumers can add or remove a favorite movie to their list, also set or change a rating or note to it.

![view-image-1](https://github.com/MesutNedzhib/mk-it-movie-app/blob/master/client/public/my-movie-coll.png)

#

![view-image-2](https://github.com/MesutNedzhib/mk-it-movie-app/blob/master/client/public/my-movie-coll-search.png)

#

![view-image-3](https://github.com/MesutNedzhib/mk-it-movie-app/blob/master/client/public/my-movie-coll-details.png)

## How to run

1. Download.
2. Open the folder in the CLI and go to **server** direcory using command `cd server`.
3. Go to open and edit config.env file in the config/env directory.
4. Run the following commands for the **server** directory:
   - `npm install`
   - `npm start`
5. Open the new CLI in the main folder and go to **client** directory using command `cd client`.
6. Run the following commands for the **client** directory:
   - `npm install`
   - `npm start`
7. Enjoy :)

## Features

The application is based on the three-tier architecture of the MERN stack, which consists of a client side, a server side, and a database.
The MERN stack consists of MongoDB, Express JS, React JS and Node JS.
Access to the controllers in the application is done by authenticating the Json Web Token. Upon successful login in the system, a token is attached to the user, which provides access to functionalities according to his role.
The application has the following functionalities:

## Backend

- Authorization
  - Register
  - Sign In
  - Logout
- User
  - Get all users with their favorite movies
  - Get single user
- Favorite
  - Add movie to favorites
  - Get favorite movies
  - Remove movie from favorites
- Rating
  - Set rating
  - Get rating
- Note
  - Add note
  - get note
  - remove note

## Dependencies

1. Api:

   - Express
   - Cors
   - Dotenv
   - Nodemon
   - Express Async Handler
   - Json Web Token
   - BcryptJS
   - Slugify
   - Mongoose

2. Client:
   - React
   - Redux
   - React Redux
   - Redux Thunk
   - React Router Dom
   - Axios
   - Bootstrap
   - Material UI
   - SASS
