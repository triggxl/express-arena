/*
Make a GET param handler endpoint on our server:
Steps:
Make a route handler
get data from the request (set 'params')
send response back to user (object containing data)
*/
const cors = require('cors');
app.use(cors);

app.get('/foo', (req,res) => {
  const { params } = req.query;
  params.bar;
  const baz = parseFloat(params.bar);
  res.send({baz})
})
//try to be goal-oriented in your learning to make connections about what you're trying to get done and it's not just arbitrary knowledge
/*
Making a fetch
a fetch returns promises
Steps:
Fetch
response validation if(!res.ok) {throw new Error('Error')} || library that alerts your user || alert
Parse json with res.json()
use .then to return data ex: changing state
*/
fetch('url').then((res)=> res.json().then((data)=> this.setState({ data }) ))
fetch('url', { method: 'POST', body: JSON.stringify({foo : 1}) }).then((data)=> this.setState({ data }) )

let foo;
//seperation of declaration and assignment 
foo = 1
foo = []

//creating a fetch and receiving data back...creating route handler + getting data out of our parameters...returning data client back to the client as a json response
fetch('/qux?foo=3').then((res) => res.json()).then(data => console.log(data.bar))
app.get('/qux', (req,res) => {
  const { foo } = req.query.params;
  const num = parseFloat(foo) + 5;
  res.send({bar : num, title : num})
})
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch