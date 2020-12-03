const express = require('express');
const app = express();
const googleData = require('./google-app-data');

morgan = require('morgan');
app.use(morgan('common'));

app.all('/apps', (req,res) => {
  const { sort, genres } = req.query;

  const appChoices = googleData.filter(ac => ac.App.toLowerCase().includes(genres.toLowerCase()))
  if(!['Rating', 'App'].includes(sort)) {
    res.status(400).send(`Sort must be either by Rating or App`);
  }
  if(sort) {
    results.sort((a,b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }
  res.json(appChoices);
})
app.listen((8000), () => {
  console.log('App listening on Port 8000!');
})