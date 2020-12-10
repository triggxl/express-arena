const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

/*
write test for normal case (no params)
test content as been sent with the right content-type and status
use chai assertion to examine the body
  is array?
  does array contain books objects?
  sort param of title or length
*/
describe('GET/books', () => {
  it.skip('should return an array of books', () => {
    return supertest(app).get('/books').expect(200).expect('Content-Type', /json/);
  }).then(res => {
  expect(res.body).to.be.an('array');
  expect(res.body).to.have.lengthOf.at.least(1);
  const book = res.body[0];
  expect(book).to.include.all.keys('bestsellers_date', 'author', 'description', 'title');
  });
  it('should be 400 if sort is incorrect', () => {
    return supertest(app).get('/books').query({ sort: 'MISTAKE'}).expect(400, 'Sort must be either of title or rank')
  });
  it('should sort by title', () => {
    //supertest...endpoint...query object...status...content-type... .then(res => expect(res.body)...data type received)...additional logic
    return supertest(app)
    .get('/books')
    .query({sort: 'title'})
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body).to.be.an('array');
      let sorted = true;
      while (i < res.body.length - 1) {
        // compare book at `i` with next book at `i + 1`
        const bookAtI = res.body[i];
        const bookAtIPlus1 = res.body[i + 1];
        // if the next book is less than the book at i,
        if (bookAtIPlus1.title < bookAtI.title) {
          // the books were not sorted correctly
          sorted = false;
          break; // exit the loop
        }
        i++;
      }
      expect(sorted).to.be.true;
    });
  });
});
//using .skip: either describe.skip (skip whole suite of tests) or it.skip for an individaul test case
//use .only to run a specific test or suite "only"
