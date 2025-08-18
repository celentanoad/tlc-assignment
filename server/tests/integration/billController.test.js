const request = require('supertest');
const express = require('express');
const billRoutes = require('../../routes/billRoutes');

const app = express();
app.use(express.json());
app.use('/api/billnumber', billRoutes);

describe('POST /api/billnumber/parse', () => {
  it('should successfully parse a valid bill number and return normalized formats', async() => {
    const res = await request(app)
    .post('/api/billnumber/parse')
    .send({ billNumber: 'HB005' });
    expect(res.statusCode).toEqual(200);
  });

  it('should return status 422 with "Invalid bill number" for bill numbers with invalid chamber', async() => {
    const res = await request(app)
    .post('/api/billnumber/parse')
    .send({ billNumber: 'XCR005' });
    expect(res.statusCode).toEqual(422);
    expect(res.body.error).toEqual('Invalid bill number');
  });

  it('should return status 422 with "Invalid bill number" for bill numbers with invalid type', async() => {
    const res = await request(app)
    .post('/api/billnumber/parse')
    .send({ billNumber: 'HX005' });
    expect(res.statusCode).toEqual(422);
    expect(res.body.error).toEqual('Invalid bill number');
  });

    it('should return status 422 with "Invalid bill number" for bill numbers with invalid chamber/type combination', async() => {
    const res = await request(app)
    .post('/api/billnumber/parse')
    .send({ billNumber: 'BH005' });
    expect(res.statusCode).toEqual(422);
    expect(res.body.error).toEqual('Invalid bill number');
  })



  it('should return status 400 with "Bill number is required" when the billNumber is empty', async () => {
    const res = await request(app)
    .post('/api/billnumber/parse')
    .send({ billNumber: '' });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual('Bill number is required');
  });
});