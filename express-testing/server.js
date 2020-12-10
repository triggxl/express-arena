// In this file require the app and start the server listening.
const app = require('./app');

app.listen(8000, () => {
  console.log('Server running on Port 8000!');
});