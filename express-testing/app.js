//require...use..get...listen
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('common'));

app.get('/', (req,res) => {
  res.send('Hello from the express-testing server!');
});
// Write a GET endpoint on path /quotient that takes two query parameters a and b and return a/b, error if b == 0.
app.get('/quotient', (req,res) => {
  //set params
  const { a,b } = res.query;
  //conditionals
  if(!a || !b) {
    res.status(400).send('A value for a and b is required.');
  }
  if(b == 0) {
    res.status(400).send('Cannot divide by zero, hello!');
  }
  //convert to number
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  //isNan
  if(isNaN(numA)) {
    res.status(400).send('Value for a must be numeric');
  }
  if(isNaN(numB)) {
    res.status(400).send('Value for b must be numeric');
  }
  const answer = numA / numB;
  res.send(`The total of ${numA} divided by ${numB} is ${answer}.`);
});
// Write a handler function for the endpoint GET /generate that accepts a positive integer n and generates an array of n elements containing the numbers from 1 to n in random order. So /generate?n=5 may return the array [4,3,1,5,2] or [3, 5, 2, 1, 4] or any other permutation.
app.get('/generate', (req,res) => {
  // const n = req.query.n;
  const { n } = req.query;
  //convert
  const num = parseFloat(n);

  if(isNaN(num)) {
    return res.status(400).send('Input must be a number');
  }
  //generate array [1..n] of indices 
  const initial = Array(num).fill(1).map((_, i) => i + 1);
  //shuffle array
  initial.forEach((temp, i) => {
    //incantation from 1 to n
    let ran = Math.floor(Math.random() * num);
    // let temp = intial[i];
    //set initial zero place to some random number and position take two slots in the array and switch them which each other
    initial[i] = initial[ran];
    initial[ran] = temp;
  })
  res.json(initial);
  // Write an endpoint handler function GET /midpoint that accepts the latitude and longitude coordinates for two points on the Earth. Calculate the midpoint between these two points and return an object { lat: midLat, lon: midLon }.
  app.get('/midpoint', (req,res) => {
    const toRadians = (deg) => {
      deg * (Math.PI /180 );
    }
    const toDegrees = (rad) => {
      rad * (180 / Math.PI);
    }
    const { lon1, lat1, lon2, lat2 } = req.query;
    //convert to radians
    const rlat1 = toRadians(lat1);
    const rlon1 = toRadians(lon1);
    const rlat2 = toRadians(lat2);
    const rlon2 = toRadians(lon2);

    const bx = Math.cos(lat2) * Math.cos(rlon2- rlong1);
    const by = Math.cos(rlat2) * Math.sin(rlon2 - rlon1);

    const midLat = Math.atan2(
    Math.sin(rlat1) + Math.sin(rlat2),
    Math.sqrt(Math.cos(rlat1) + bx) * (Math.cos(rlat1) + bx)
    + by * by
    )
    const midlon = rlon1 + Math.atan2(by, Math.cos(rlat1) + bx);

    res.json({ lat: toDegrees(midlat), lon: toDegrees(midlon)})
  })
  // Write an endpoint handler function GET /frequency that accepts a String s. Count the frequency of occurrence of each character in the String, the total number of distinct characters, the average frequency, and the character with the highest frequency. Return an object in the format:
  //Where the input may have been 'aaBBAAbbaa'. Throw an error if the String is undefined. If more than one characters tie for highest frequency return the one closest to the beginning of the alphabet.
  app.get('/frequency', (req,res) => {
    const s = req.query.s;
    if(!s) {
      return res.status(400).send('Invalid Request');
    }
    const counts = s.toLowerCase().split('').reduce((acc, curr) => {
      if(acc[curr]) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});
    
    const unique = Object.keys(counts).length;
    const average = s.length /unique;
    let highest = '';
    let highestVal = 0;

    Object.keys(counts).forEach(k => {
      if(counts[k] > highestVal) {
        highestVal = counts[k];
        highest = k;
      } 
    })

    counts.unique = unique;
    counts.average = average;
    counts.higest = highest;
    res.json(counts);
  })
})

// export the Express application object
module.exports = app;

// app.listen(8000, ()=> {
//   console.log('Now listening on Port 8000!');
// });

// //require...use..get...listen (my version)
// const express = require('express');
// const app = express;
// const morgan = require('common');
// app.use(morgan);

// app.get('/', (req,res) => {
//   console.log('Hello from express-testing server!');
// });

// app.listen(8000, ()=> {
//   console.log('Now listening on Port 8000!');
// });