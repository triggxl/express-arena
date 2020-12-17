require('dotenv').config;
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const POKEDEX = require('./pokedex.json');
const cors = require('cors');

const app = express();
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting))
app.use(helmet()); //https://github.com/helmetjs/helmet#how-it-works
app.use(cors);

//default GET/types
const validTypes = ['Bugs', 'Dark', 'Dragon', 'Electric', `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`];

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization')
  if(!authToken || authToken.split(' ')[1] !== apiToken) {
    res.status(401).json({error: 'Unathorized request'});
  }
  next();
})
//separate middleware as cb into named function; passing into app method
const handleGetTypes = (req, res) => {
  res.json(validTypes);
}

app.get('/types', handleGetTypes)

const handleGetPokemon = (req, res) => {
  res.send('Hello Pokemon!')
}

app.get('/pokemon', handleGetPokemon), (req, res) => {
  let response = POKEDEX.pokemon;
  //filter pokemon by name, if name query param is present
  if(req.query.name) {
    response = response.filter(pokemon => {pokemon.name.toLowerCase().includes(req.query.name.toLowerCase())})
  }
  //filter pokemon by type, if type query param is present
  if(req.query.type) {
    response = response.filter(pokemon => {pokemon.type.toLowerCase().includes(req.query.name.toLowerCase())})
  }
  res.json(response)
}
// 4 parameters in middleware, express knows to treat this as error handler
app.use((error, req, res, next) => {
  let response;
  if(process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' }}
  } else {
    response = { error }
  }
  res.status(500).json(response)
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
})

//default replaced by middleware and app.get
// app.use((req,res) => {
//   res.send('Hello world');
// });
