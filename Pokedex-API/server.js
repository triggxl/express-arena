require('dotenv').config
const express = require('express');
const morgan = require('morgan');
const POKEDEX = require('./pokedex.json');
const cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(cors);

console.log(process.env.API_TOKEN)

//default array for GET/types
const validTypes = ['Bugs', 'Dark', 'Dragon', 'Electric', `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`];

app.use(function validateBearerToken(req, res, next) {
  // const bearerToken = req.get('Authorization').split(' ')[1];
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization')
  console.log('validate bearer token middleware');
  if(!authToken || authToken.split(' ')[1] !== apiToken) {
    res.status(401).json({error: 'Unathorized request'});
  }
  //move on to next middleware
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
  // const { name, type } = req.query.params;
  // params.name = 
  let response = POKEDEX.pokemon;
  //filter pokemon by name if name query param is present
  if(req.query.name) {
    response = response.filter(pokemon => {pokemon.name.toLowerCase().includes(req.query.name.toLowerCase())})
  }
  //filter our pokemon by type if type query param is present
  if(req.query.type) {
    response = response.filter(pokemon => {pokemon.type.toLowerCase().includes(req.query.name.toLowerCase())})
  }
  res.json(response)
}

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
})

//default replaced by middleware and app.get
// app.use((req,res) => {
//   res.send('Hello world');
// });
