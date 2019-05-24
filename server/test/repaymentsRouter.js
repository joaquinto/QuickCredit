import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import data from './testData';

chai.use(chaiHttp);

describe('Create Repayments', () => {
  let userToken;
  beforeEach(async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.signIn);
    assert.equal((res.body.status), 200);
    assert.property((res.body), 'status');
    assert.property((res.body), 'data');
    assert.property((res.body.data), 'token');
    userToken = res.body.data.token;
  });

  it('should throw an error for missing paid amount', async () => {
    const res = await chai.request(app)
      .post('/api/v1/loans/1/repayment')
      .set('Authorization', userToken);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing token', async () => {
    const res = await chai.request(app)
      .post('/api/v1/loans/1/repayment')
      .send(data.paidAmount);
    assert.equal((res.body.status), 403);
    assert.property((res.body), 'error');
  });

  it('should throw an error if the paid amount is not equal to the monthly installment payment', async () => {
    const res = await chai.request(app)
      .post('/api/v1/loans/1/repayment')
      .set('Authorization', userToken)
      .send(data.paidAmountOne);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for invalid loan id', async () => {
    const res = await chai.request(app)
      .post('/api/v1/loans/4105/repayment')
      .set('Authorization', userToken)
      .send(data.paidAmountOne);
    assert.equal((res.body.status), 404);
    assert.property((res.body), 'error');
  });

  it('should return a repaymant object', async () => {
    const res = await chai.request(app)
      .post('/api/v1/loans/1/repayment')
      .set('Authorization', userToken)
      .send(data.paidAmount);
    assert.equal((res.body.status), 201);
    assert.property((res.body), 'data');
  });
});

describe('Get Repayments history for a loan', () => {
  let userToken;
  const clientToken = 'hbfjnkjeknjvjrnkvrmk';
  beforeEach(async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.signIn);
    assert.equal((res.body.status), 200);
    assert.property((res.body), 'status');
    assert.property((res.body), 'data');
    assert.property((res.body.data), 'token');
    userToken = res.body.data.token;
  });

  it('should throw an error for missing token', async () => {
    const res = await chai.request(app)
      .get('/api/v1/loans/1/repayments');
    assert.equal((res.body.status), 403);
    assert.property((res.body), 'error');
  });

  it('should throw an error for invalid loan id', async () => {
    const res = await chai.request(app)
      .get('/api/v1/loans/410/repayments')
      .set('Authorization', userToken);
    assert.equal((res.body.status), 404);
    assert.property((res.body), 'error');
  });

  it('should throw an error for invalid token', async () => {
    const res = await chai.request(app)
      .get('/api/v1/loans/1/repayments')
      .set('Authorization', clientToken);
    assert.equal((res.body.status), 401);
    assert.property((res.body), 'error');
  });

  it('should return a repeymant object', async () => {
    const res = await chai.request(app)
      .get('/api/v1/loans/1/repayments')
      .set('Authorization', userToken);
    assert.equal((res.body.status), 200);
    assert.property((res.body), 'data');
  });
});

describe('Get all Repayments', () => {
  let userToken;
  const clientToken = 'hbfjnkjeknjvjrnkvrmk';
  beforeEach(async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.signIn);
    assert.equal((res.body.status), 200);
    assert.property((res.body), 'status');
    assert.property((res.body), 'data');
    assert.property((res.body.data), 'token');
    userToken = res.body.data.token;
  });

  it('should throw an error for missing token', async () => {
    const res = await chai.request(app)
      .get('/api/v1/repayments');
    assert.equal((res.body.status), 403);
    assert.property((res.body), 'error');
  });

  it('should throw an error for invalid token', async () => {
    const res = await chai.request(app)
      .get('/api/v1/repayments')
      .set('Authorization', clientToken);
    assert.equal((res.body.status), 401);
    assert.property((res.body), 'error');
  });

  it('should return a repeymant object', async () => {
    const res = await chai.request(app)
      .get('/api/v1/repayments')
      .set('Authorization', userToken);
    assert.equal((res.body.status), 200);
    assert.property((res.body), 'data');
  });
});
