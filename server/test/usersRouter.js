import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import data from './testData';

chai.use(chaiHttp);

describe('Signing Up', () => {
  let request;
  beforeEach(() => {
    request = chai.request(app);
  });

  it('should throw an error for missing firstname', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.missingFirstname);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing lastname', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.missingLastname);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing email', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.missingSignupEmail);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing password', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.missingSignupPassword);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing address', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.missingSignupAddress);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('Should return the user object', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.signUp);
    assert.equal((res.body.status), 201);
    assert.property((res.body), 'status');
    assert.property((res.body), 'data');
    assert.property((res.body.data), 'token');
    assert.property((res.body.data), 'id');
    assert.property((res.body.data), 'firstname');
    assert.property((res.body.data), 'lastname');
    assert.property((res.body.data), 'email');
    assert.property((res.body.data), 'address');
    assert.property((res.body.data), 'status');
    assert.property((res.body.data), 'isAdmin');
    assert.equal((res.body.data.firstname), 'john');
    assert.equal((res.body.data.lastname), 'wick');
    assert.equal((res.body.data.email), 'johnwick@gmail.com');
    assert.equal((res.body.data.address), 'no 255 wallstreet, new york');
    assert.equal((res.body.data.status), 'unverified');
  });

  it('should return status 200', async () => {
    const res = await chai.request(app)
      .get('/');
    assert.equal((res.body.status), 200);
    assert.property((res.body), 'data');
    assert.equal((res.body.data), 'welcome to Quick Credit');
  });
});

describe('Signing In', () => {
  let request;
  beforeEach(() => {
    request = chai.request(app);
  });

  it('should throw an error for missing email', async () => {
    const res = await request
      .post('/api/v1/auth/signin')
      .send(data.missingEmail);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing password', async () => {
    const res = await request
      .post('/api/v1/auth/signin')
      .send(data.missingPassword);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for invalid email', async () => {
    const res = await request
      .post('/api/v1/auth/signin')
      .send(data.invalidEmail);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for invalid password', async () => {
    const res = await request
      .post('/api/v1/auth/signin')
      .send(data.invalidPassword);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for wrong password', async () => {
    const res = await request
      .post('/api/v1/auth/signin')
      .send(data.signInWithWrongPassword);
    assert.equal((res.body.status), 405);
    assert.property((res.body), 'error');
  });

  it('Should return the user object', async () => {
    const res = await request
      .post('/api/v1/auth/signin')
      .send(data.signIn);
    assert.equal((res.body.status), 200);
    assert.property((res.body), 'status');
    assert.property((res.body), 'data');
    assert.property((res.body.data), 'token');
    assert.property((res.body.data), 'id');
    assert.property((res.body.data), 'firstname');
    assert.property((res.body.data), 'lastname');
    assert.property((res.body.data), 'email');
    assert.property((res.body.data), 'address');
    assert.property((res.body.data), 'status');
    assert.property((res.body.data), 'isAdmin');
  });
});

describe('verify user', () => {
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

  it('should return an error for missing token', async () => {
    const res = await chai.request(app)
      .patch('/api/v1/users/johnwick@gmail.com/verify')
      .send(data.verify);
    assert.equal((res.body.status), 403);
    assert.property((res.body), 'error');
  });

  it('should return an error for invalid email', async () => {
    const res = await chai.request(app)
      .patch('/api/v1/users/johnwickgmail.com/verify')
      .set('Authorization', userToken)
      .send(data.verify);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should return an error for missing status', async () => {
    const res = await chai.request(app)
      .patch('/api/v1/users/johnwick@gmail.com/verify')
      .set('Authorization', userToken);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should return an error is the body is not verified', async () => {
    const res = await chai.request(app)
      .patch('/api/v1/users/johnwick@gmail.com/verify')
      .set('Authorization', userToken)
      .send(data.verifyError);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should return an error for unknown user', async () => {
    const res = await chai.request(app)
      .patch('/api/v1/users/johnwick12@gmail.com/verify')
      .set('Authorization', userToken)
      .send(data.verify);
    assert.equal((res.body.status), 404);
    assert.property((res.body), 'error');
  });

  it('should return a user object', async () => {
    const res = await chai.request(app)
      .patch('/api/v1/users/johnsnow@gmail.com/verify')
      .set('Authorization', userToken)
      .send(data.verify);
    assert.equal((res.body.status), 200);
    assert.property((res.body), 'data');
  });
});

// describe('Reset password', () => {
//   it('it should have a status code of 200', async () => {
//     const res = await chai.request(app)
//       .post('/api/v1/users/johnsnow@gmail.com/reset_password');
//     assert.equal((res.status), 200);
//   });

//   it('it should have a status code of 204', async () => {
//     const res = await chai.request(app)
//       .post('/api/v1/users/johnsnow@gmail.com/reset_password');
//     assert.equal((res.body.status), 204);
//   });
// });
