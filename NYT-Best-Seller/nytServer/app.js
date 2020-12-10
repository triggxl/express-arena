/*
//SERVER
Working with the Express response object
Instructions:
Serve up list of New York bestsellers (we will only list 20 of the bestsellers in an array that we will keep on the server)
The server will have an endpoint /books that accept parameters: search and sort
Once the server is built we will build a simple React client with a search component that fetches the book data from the server and displays it on the screen
*/
const express = require('express');
app = express();
const morgan = require('morgan');
//use in express
app.use(morgan('common'));
const books = require('./books-data');
// getting 404 despite installing middleware (12/3)
// const cors = require('cors');
// app.use(cors());

app.get('/books', (req,res) => {
  const { search = '', sort } = req.query;
  //returns true if searchString is found within str.
  let results = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));
  //validation for user entry of either title or rank
  if(sort) {
    if(!['title', 'rank'].includes(sort)) {
      return res.status(400).send('Sort must be one of title or rank');
    }
  }
  //book results are sorted after filtered by search
  if(sort) {
    results.sort((a,b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }
  res.json(results);
})

/*
Steps: New Node project
1.) Create a new folder and initialize a Node application:
2.) Create a script file, install nodemon, express and morgan.
3.) Modify package.json to add scripts for the project.
4.) Copy data into seperate directory (or make API call to server..?)
5.) Create the basic server in app.js with Express and add morgan.
6.) Run the server and we are all set to start implementing the solution.

a.) First, let us require the array of books:
b.) And just to see if it works let's just return the entire list of books.

*/


