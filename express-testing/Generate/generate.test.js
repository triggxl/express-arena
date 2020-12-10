const { expect } = require('chai');
const supertest = require("supertest");
const app = require('../app');

supertest(app).get('/generate').query( {num : '2'}).expect(200).then(res => {
  //make sure is array
  expect(res.body).to.be.an('array');
  //array must not be empty
  expect(res.body).to.have.lengthOf.at.least(1);
  //this assertion fails
  expect(res.body).to.include(2); //ensure that all the values are included --> include.members([1,2,3,4,5]);
})