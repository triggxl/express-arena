//require express package
const express = require("express")();
const morgan = require("morgan");
//encapsulates the functionality of your Express server
const app = express;
app.use(morgan('common'));
//https://www.npmjs.com/package/morgan
//function that responds with some text to GET request to the given URL ;sending some text to client
// app.get('/', (req,res){
//   res.send("Hello, Express!");
// });

//route handlers (server-endpoint routes)
app.get('/', (req, res) => {
  //displaying messsage once handler is invoked
  res.send('Hello Express, my name is ____ and I live in ________, ____!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy Cheese Burgers!!');
});

app.get('/pizza/pepperoni', (req, res) => {
  res.send('Your pizza is on the way!');
});

app.get('/pizza/pineapple', (req,res) => {
  res.send(`Ba-zun-ga! We don't serve that here. Never call again!`);
});
//morgan (middleware)
app.get('/morgan', (req,res) => {
  console.log(`Here's...Morgan!`);
})
app.get('/morgan/Pfizer', (req,res) => {
  console.log(`Let's get ready to rumble!!!!`);
})
// add a new handler function with the path /echo
app.get('/echo', (req,res) => {
  const responseText = `Here are some details of your response text:
  Base URL: ${req.baseURL}
  Host: ${req.hostname}
  Path: ${req.path}
  Body: ${req.body}
  Cookies: ${req.cookies}
  Params: ${req.params}
  Protocol: ${req.protocol}
  `
  res.send(responseText);
});

//create a new route handler function on the path /queryViewer
app.get('/queryViewer', (req,res) => {
  console.log(req.query)
  res.end(); //don't send anything back to the server
});

//A function that responds to the query strings sent from the client (will return a 400)
app.get('/greetings', (req,res) =>{
  const name = req.query.name;
  const race = req.query.race;
  if(!name) {
    return res.status(400).send('Please enter a name.');
  }
  if(!race) {
    return res.status(400).send('Please enter a race.')
  }
  const greeting = `Greetings ${name}, the ${race}. Welcome to our Kingdom.`
  res.send(greeting);
})

//assignment 1.) my solution Q: Where are the numbers coming from?
// app.get('/sum', (req, res)=> {
//   const a = req.query.a;
//   const b = req.query.b;

//   const sum = `The sum of ${a}+${b} is c`;
//   res.send(sum)
// })
/*
assignment 1.) their solution Create a route handler function on the path /sum that accepts two query parameters named a and b and find the sum of the two values.Return a string in the format "The sum of a and b is c". Note that query parameters are always strings so some thought should be given to converting them to numbers.
*/
//a is required
app.get('/sum', (req, res)=> {
  const a = req.query.a;
  const b = req.query.b;

  //validate required
  if(!a) {
    return res.status(400).send('a is required');
  }
  if(!b) {
    return res.status(400).send('b is required');
  }

  //convert to number
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  //validate number
  if(Number.isNaN(numA)) {
    return res.status(400).send('a must be a number');
  }
  if(Number.isNaN(numB)) {
    return res.status(400).send('ba must be a number');
  }

  const c = numA + numB;

  const sum = `The sum of ${numA}+${numB} is ${c}`;
  res.status(200).send(sum);
})

//assignment 2.) my solution
// app.get('/cipher', (req, res) => {
//   const text = req.query.text;
//   const shift = req.query.shift;
//   if(!shift) {
//     res.status(400).send(`No shift available.`)
//   }
//   //< base || code > (base + 26)) { return char; }
//   if(!text){
//     res.status(400).send(`No text here..`)
//   }
//   const encrpytion = `The encryption shift is ${shift}. It's original text is ${text}`
//   res.send(encrpytion);
// })

/*assignment 2). their solution Create an endpoint /cipher. The handler function should accept a query parameter named text and one named shift. Encrypt the text using a simple shift cipher also known as a Caesar Cipher. It is a simple substitution cipher where each letter is shifted a certain number of places down the alphabet. So if the shift was 1 then A would be replaced by B, and B would be replaced by C and C would be replaced by D and so on until finally Z would be replaced by A. using this scheme encrypt the text with the given shift and return the result to the client. Hint - String.fromCharCode(65) is an uppercase A and 'A'.charCodeAt(0) is the number 65. 65 is the integer value of uppercase A in UTF-16. See the documentation for details. */
//no shift available
app.get('/cipher', (req, res) => {
  const { shift, text } = req.query;

  // validation: both values required, shift must be a number
  if(!shift) {
    res.status(400).send(`No shift available.`)
  }
  if(!text){
    res.status(400).send(`Text is required`)
  }
  //parse to appropriate data type
  const numShift = parseFloat(shift);

  if(Number.isNaN(numShift)) {
    res.status(400).send('Shift must be a number');
  }

  const base = 'A'.charCodeAt(0);

  const cipher = text
    .toUpperCase()
    .split('') // create an array of characters
    .map(char => { // map each original char to a converted char
      const code = char.charCodeAt(0); //get the char code

      // if it is not one of the 26 letters ignore it
      if(code < base || code > (base + 26)) {
        return char;
      }
      
      // otherwise convert it
      // get the distance from A
      let diff = code - base;
      diff = diff + numShift; 
      
      // in case shift takes the value past Z, cycle back to the beginning
      diff = diff % 26;

      // convert back to a character
      const shiftedChar = String.fromCharCode(base + diff);
      return shiftedChar;
    })
    .join(''); // construct a String from the array

  // Return the response
  res
    .status(200)
    .send(cipher);  
});

/*assignment 3 my solution: To send an array of values to the server via a query string simply repeat the key with different values. For instance, the query string ?arr=1&arr=2&arr=3 results in the query object { arr: [ '1', '2', '3' ] }. Create a new endpoint /lotto that accepts an array of 6 distinct numbers between 1 and 20 named numbers. The function then randomly generates 6 numbers between 1 and 20. Compare the numbers sent in the query with the randomly generated numbers to determine how many match. If fewer than 4 numbers match respond with the string "Sorry, you lose". If 4 numbers match respond with the string "Congratulations, you win a free ticket", if 5 numbers match respond with "Congratulations! You win $100!". If all 6 numbers match respond with "Wow! Unbelievable! You could have won the mega millions!". */
// validation: 
  // 1. the numbers array must exist
  // 2. must be an array
  // 3. must be 6 numbers
  // 4. numbers must be between 1 and 20
  // app.get('/lotto', (req,res) => {
  //   const { lotto } = req.query;

  //   if(!Array.isArray(lotto)) {
  //     res.status(400).send('Lotto numbers must exist as an array');
  //   }

  //   const numLotto = parseFloat(lotto);
    
  //   if(numLotto < 6) {
  //     res.status(400).send('Lotto must consist of 6 numbers');
  //   }
  //   if(1 < numLotto > 20) {
  //     res.status(400).send('Number must be between 1 and 20');
  //   }
  //   //if valid
  //   if(numLotto.match(lotto) < 4) {
  //     res.status(200).send('Sorry, you lose.');
  //   }
  //   if(numLotto.match(lotto) === 4) {
  //     res.status(200).send(`Congratulations, you've won a free ticket!`);
  //   }
  //   if(numLotto.match(lotto) === 6) {
  //     res.status(200).send(`Wow! Unbelievable! You could have won the mega millions!`)
  //   }
  //   //send to server
  //   res.status(200).send(numLotto)

  // });

/*
assignemnt 3: their solution (numbers is required)
*/
app.get('/lotto', (req, res) => {
  const { numbers } = req.query; 

  // validation: 
  // 1. the numbers array must exist
  // 2. must be an array
  // 3. must be 6 numbers
  // 4. numbers must be between 1 and 20

  if(!numbers) {
    return res
      .status(400)
      .send("numbers is required");
  }

  if(!Array.isArray(numbers)) {
    return res
      .status(400)
      .send("numbers must be an array");
  }

  const guesses = numbers
        .map(n => parseInt(n))
        .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));
  
  if(guesses.length != 6) {
    return res
      .status(400)
      .send("numbers must contain 6 integers between 1 and 20");
  }      

  // fully validated numbers

  // here are the 20 numbers to choose from
  const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);

  //randomly choose 6
  const winningNumbers = [];
  for(let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }

  //compare the guesses to the winning number
  let diff = winningNumbers.filter(n => !guesses.includes(n));

  // construct a response
  let responseText;

  switch(diff.length){
    case 0: 
      responseText = 'Wow! Unbelievable! You could have won the mega millions!';
      break;
    case 1:   
      responseText = 'Congratulations! You win $100!';
      break;
    case 2:
      responseText = 'Congratulations, you win a free ticket!';
      break;
    default:
      responseText = 'Sorry, you lose';  
  }


  // uncomment below to see how the results ran

  res.json({
    guesses,
    winningNumbers,
    diff,
    responseText
  });

  res.send(responseText);
});
app.listen(8000, ()=> {
  console.log('Express server is listening on port 8000!');
})