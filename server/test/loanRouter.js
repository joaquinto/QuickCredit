import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import data from './testData';

chai.use(chaiHttp);

describe('Create a loan', () => {
  let userToken;
  beforeEach(async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.client);
    assert.equal((res.body.status), 200);
    assert.property((res.body), 'status');
    assert.property((res.body), 'data');
    assert.property((res.body.data), 'token');
    userToken = res.body.data.token;
  });

  it('should throw an error for missing firstname', async () => {
    const res = await chai.request(app)
      .post('/api/v1/loans')
      .set('Authorization', userToken)
      .send(data.loanMissingFirstname);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing lastname', async () => {
    const res = await chai.request(app)
      .post('/api/v1/loans')
      .set('Authorization', userToken)
      .send(data.loanMissingLastname);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing email', async () => {
    const res = await chai.request(app)
      .post('/api/v1/loans')
      .set('Authorization', userToken)
      .send(data.loanMissingEmail);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing tenor', async () => {
    const res = await chai.request(app)
      .post('/api/v1/loans')
      .set('Authorization', userToken)
      .send(data.loanMissingTenor);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing amount', async () => {
    const res = await chai.request(app)
      .post('/api/v1/loans')
      .set('Authorization', userToken)
      .send(data.loanMissingAmount);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing token', async () => {
    const res = await chai.request(app)
      .post('/api/v1/loans')
      .send(data.loan);
    assert.equal((res.body.status), 403);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing loan object', async () => {
    const res = await chai.request(app)
      .post('/api/v1/loans')
      .set('Authorization', userToken);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should return a loan object', async () => {
    const res = await chai.request(app)
      .post('/api/v1/loans')
      .set('Authorization', userToken)
      .send(data.loan);
    assert.equal((res.body.status), 201);
    assert.property((res.body), 'data');
  });
});

describe('Get all loans', () => {
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

  it('should throw an error for missing token', async () => {
    const res = await chai.request(app)
      .get('/api/v1/loans');
    assert.equal((res.body.status), 403);
    assert.property((res.body), 'error');
  });

  it('should return an array of loan objects', async () => {
    const res = await chai.request(app)
      .get('/api/v1/loans')
      .set('Authorization', userToken);
    assert.equal((res.body.status), 200);
    assert.property((res.body), 'data');
  });

  it('should return an error for invalid query string', async () => {
    const res = await chai.request(app)
      .get('/api/v1/loans?status=approved&repaid=goinghome')
      .set('Authorization', userToken);
    assert.equal((res.body.status), 404);
    assert.property((res.body), 'error');
  });

  it('should return an array of loan objects', async () => {
    const res = await chai.request(app)
      .get('/api/v1/loans?status=approved&repaid=true')
      .set('Authorization', userToken);
    assert.equal((res.body.status), 404);
    assert.property((res.body), 'error');
  });

  it('should return an array of loan objects', async () => {
    const res = await chai.request(app)
      .get('/api/v1/loans?status=approved&repaid=false')
      .set('Authorization', userToken);
    assert.equal((res.body.status), 404);
    assert.property((res.body), 'error');
  });
});

describe('Get a single loan', () => {
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

  it('should throw an error for missing token', async () => {
    const res = await chai.request(app)
      .get('/api/v1/loans/1');
    assert.equal((res.body.status), 403);
    assert.property((res.body), 'error');
  });

  it('should throw an error for invalid loan id', async () => {
    const res = await chai.request(app)
      .get('/api/v1/loans/143')
      .set('Authorization', userToken);
    assert.equal((res.body.status), 404);
    assert.property((res.body), 'error');
  });

  it('should return a loan objects', async () => {
    const res = await chai.request(app)
      .get('/api/v1/loans/1')
      .set('Authorization', userToken);
    assert.equal((res.body.status), 200);
    assert.property((res.body), 'data');
  });
});

describe('Approve or reject a loan loan', () => {
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

  it('should throw an error for missing token', async () => {
    const res = await chai.request(app)
      .patch('/api/v1/loans/1')
      .send(data.approve);
    assert.equal((res.body.status), 403);
    assert.property((res.body), 'error');
  });

  it('should throw an error for invalid loan id', async () => {
    const res = await chai.request(app)
      .patch('/api/v1/loans/1')
      .set('Authorization', userToken)
      .send(data.reject);
    assert.equal((res.body.status), 200);
    assert.property((res.body), 'data');
  });

  it('should return a loan objects for rejected', async () => {
    const res = await chai.request(app)
      .patch('/api/v1/loans/1')
      .set('Authorization', userToken)
      .send(data.reject);
    assert.equal((res.body.status), 200);
    assert.property((res.body), 'data');
  });

  it('should return a loan objects approved', async () => {
    const res = await chai.request(app)
      .patch('/api/v1/loans/1')
      .set('Authorization', userToken)
      .send(data.approve);
    assert.equal((res.body.status), 200);
    assert.property((res.body), 'data');
  });
});
