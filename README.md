# MyReads Web App

## Introduction
This web app allows you to search an API for books and add them to your own personal shelves. You can organize your books onto three different shelves--Currently Reading, Read and Want to Read. The app was built as the first project for the React Nanodegree at Udacity. I started with a provided starter template that included just static CSS and HTML markup. From this starter I wrote the React code to make it work.

## Installation and Setup
- Clone or download the repository from GitHub
- Open up a comand terminal/prompt and go to that directory.
- Run the command `npm install`
- When that is done rung the command `npm start`
- This should run start a local web server and open a web browser window to the page

## Backend Server

The backend server was provided so that we could focus on the React code. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods necessary operations on the backend:

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This project was done as a student in the Udacity React Nanodegree program. Since it is project to show my own code, contributions will not be accepted.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
