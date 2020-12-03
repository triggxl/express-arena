express = require('express');
app = express();

morgan = require('morgan');
app.use(morgan('common'));

app.all('/apps', (req,res) => {
  // const { sort, genres } = req.query;
  res.status(200).send('All is well here.');
})
app.listen((8000), () => {
  console.log('App listening on Port 8000!');
})
