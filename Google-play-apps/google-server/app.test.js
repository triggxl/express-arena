const supertest = require('supertest');
const app = require('app');
const { expect } = require('chai');

describe('Google Play apps', () => {
  it.skip('should return 400 if input is invalid', () => {

  })
  it('should return complete list of apps by default', () => {
    return supertest(app).get('/google-app')
  }).then(res => {
    expect(res.body).to.be.an('array');
    expect(200, 'Content-Type', /json/);
  })
  it('should be able to search by either rating or app', () => {
    // const name = ['rating', 'app'];
    return supertest(app).get('/google-app').query({ name: 'rating', name: 'app'}).expect(200)
  })
  it('should return error if value present is not included in listed genre', () => {
    return supertest(app).get('/google-app').expect(400)
  }).then(res => {
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(1);
    const appGenre = res.body[0];
    expect(appGenre).to.include.all.keys('Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card');
  })
  it('should filter the list by the given value', () => {
    return supertest(app).get('/google-app').expect(200)
  })
})