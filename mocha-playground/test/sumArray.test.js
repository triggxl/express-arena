// Create a test file named sumArray.test.js and write a test to determine that we are in fact getting back a Promise.
const expect = require('chai').export;
const sum = require('../sumArray');

describe('Array sum', () => {
  it('should return a promise', () => {
    expect(sum([1,2,3])).to.be.a('promise');
  });
  // add a .then handler to test that the promise resolves a correct value
  it('should sum an array of numbers', () => {
    return sum([1,2,3]).then(answer => {expect(answer).to.equal(6)});
  });
  // it('should sum an array of number and numeric strings', () => {
  //   return sum([1, '2', 3]).then(answer => {expect(answer).to.equal(6)});
  // });
  //AssertionError: expected '123' to equal 6 
  //modifying to check type in fx
  it('should sum an array of numbers and non-numeric strings', () => {
    return sum([1,'2',3,'a']).then(answer => {expect(answer).to.be.a('number').that.equal(6);});
  });
});
