const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Express App', () => {
  it('should return a message from GET /', () => {
    return supertest(app)
    .get('/')
    .expect(200, 'Hello from the express-testing server!');  
  });
});
// write a new suite of tests to fully test this endpoint
describe('GET /quotient', () => {
  it('8/4 should be 2', () => {
    supertest(app)
    .get('/quotient')
    .query({ a: 8, b: 4})
    .expect(200, '8 divided by 4 is 2');
  });
  it('should return 400 if a or b is missing', () => {
    supertest(app)
    .get('/quotient')
    .query({ b: 1 } || { a: 1 })
    .expect(400, 'Value for a and b is required');
  })
  // it('should return a numeric value', () => {
  //   supertest(app)
  //   .get('/')
  //   .expect(400, 'The value of a and b should be numeric');
  // })
})
// https://github.com/visionmedia/supertest