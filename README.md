Book Review API

A RESTful API built using Node.js and Express.js that allows users to register, 
log in, add books, write reviews, and search for books. 
JWT is used for secure authentication, and MongoDB is used for storing data.


Tech Stack

 Node.js
 Express.js
 MongoDB with Mongoose
 JSON Web Tokens (JWT) for Authentication
 dotenv for environment variables

Run the server

node app.js
Server will run on http://localhost:5000


Authentication Endpoints
POST /signup – Register a new user
POST /login – Authenticate and receive a JWT token

Book Endpoints
POST /books – Add a new book (Authenticated users only)
GET /books – Get all books
GET /books/:id – Get book details, including: Title, Author, Genre


Review Endpoints
POST /books/:id/reviews – Add a review (Only one review per user per book)

PUT /reviews/:id – Edit your review (Authenticated user only)

DELETE /reviews/:id – Delete your review (Authenticated user only)
