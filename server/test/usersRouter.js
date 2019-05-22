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

// describe('get all user', () => {
//   let userToken;
//   let request;
//   beforeEach(async () => {
//     request = chai.request(app);
//     const res = await request
//       .post('/api/v1/auth/signin')
//       .send(data.signIn);
//     assert.equal((res.body.status), 200);
//     assert.property((res.body), 'status');
//     assert.property((res.body), 'data');
//     assert.property((res.body.data), 'token');
//     userToken = res.body.data.token;
//   });

//   it('should return an array of users object', async () => {
//     const res = await request
//       .get('/api/v1/users')
//       .set('Authorization', userToken);
//     assert.equal((res.body.status), 200);
//     assert.property((res.body), 'data');
//   });

// it('should return an error for no token provided', async () => {
//   const res = await request
//     .get('/api/v1/users');
//   assert.equal((res.body.status), 403);
//   assert.property((res.body), 'error');
// });

// it('should return an error for invalid token', async () => {
//   const res = await request
//     .get('/api/v1/users')
//     .set('Authorization', 'jhgyguguhi');
//   assert.equal((res.body.status), 401);
//   assert.property((res.body), 'error');
// });

// it('should return status 200', async () => {
//   const res = await request
//     .get('/');
//   assert.equal((res.body.status), 200);
//   assert.property((res.body), 'data');
//   assert.equal((res.body.data), 'welcome to Quick Credit');
// });

// it('should return status 200', async () => {
//   const res = await request
//     .get('/jjjfrgfjrn');
//   assert.equal((res.body.status), 404);
//   assert.property((res.body), 'error');
// });
// });

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

// describe('delete user', () => {
//   let userToken;
//   before((done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send(data.signIn)
//       .end((err, res) => {
//         assert.equal((res.body.status), 200);
//         assert.property((res.body), 'status');
//         assert.property((res.body), 'data');
//         assert.property((res.body.data), 'token');
//         userToken = res.body.data.token;
//         done();
//       });
//   });

//   it('should return an error for missing token', (done) => {
//     chai.request(app)
//       .delete('/api/v1/users/johnwick@gmail.com')
//       .end((err, res) => {
//         assert.equal((res.body.status), 403);
//         assert.property((res.body), 'error');
//         done();
//       });
//   });

//   it('should return an error for invalid email', (done) => {
//     chai.request(app)
//       .delete('/api/v1/users/johnwickgmail.com')
//       .set('Authorization', userToken)
//       .end((err, res) => {
//         assert.equal((res.body.status), 400);
//         assert.property((res.body), 'error');
//         done();
//       });
//   });

//   it('should return an array of all the users object', (done) => {
//     chai.request(app)
//       .delete('/api/v1/users/johnwick@gmail.com')
//       .set('Authorization', userToken)
//       .end((err, res) => {
//         assert.equal((res.body.status), 200);
//         assert.property((res.body), 'data');
//         done();
//       });
//   });
// });

// describe('get reset password link', () => {
//   it('should return an error for invalid email format', (done) => {
//     chai.request(app)
//       .post('/api/v1/reset-password')
//       .send(data.invalidResetEmail)
//       .end((err, res) => {
//         assert.equal((res.body.status), 400);
//         assert.property((res.body), 'error');
//         done();
//       });
//   });

//   it('should return an error for missing email', (done) => {
//     chai.request(app)
//       .post('/api/v1/reset-password')
//       .end((err, res) => {
//         assert.equal((res.body.status), 400);
//         assert.property((res.body), 'error');
//         done();
//       });
//   });

//   it('should return an error for wrong email', (done) => {
//     chai.request(app)
//       .post('/api/v1/reset-password')
//       .send(data.notResetEmail)
//       .end((err, res) => {
//         assert.equal((res.body.status), 404);
//         assert.property((res.body), 'error');
//         done();
//       });
//   });

//   it('should return a user object', (done) => {
//     chai.request(app)
//       .post('/api/v1/reset-password')
//       .send(data.resetEmail)
//       .end((err, res) => {
//         assert.equal((res.body.status), 200);
//         assert.property((res.body), 'data');
//         assert.equal((res.body.message), 'check your email for a password reset link');
//         done();
//       });
//   });
// });

// describe('reset password', () => {
//   let userEmail;
//   let userToken;
//   before((done) => {
//     chai.request(app)
//       .post('/api/v1/reset-password')
//       .send(data.resetEmail)
//       .end((err, res) => {
//         const { email, token } = res.body.data;
//         userEmail = email;
//         userToken = token;
//         done();
//       });
//   });

//   it('should display successfully', (done) => {
//     chai.request(app)
//       .get(`/api/v1/users/${userEmail}/${userToken}/reset-password`)
//       .end((err, res) => {
//         assert.equal((res.body.status), 200);
//         assert.property((res.body), 'data');
//         assert.equal((res.body.data), 'This is the reset password view');
//         done();
//       });
//   });

//   it('should return an error for missing password', (done) => {
//     chai.request(app)
//       .patch(`/api/v1/users/${userEmail}/${userToken}/reset-password`)
//       .end((err, res) => {
//         assert.equal((res.body.status), 400);
//         assert.property((res.body), 'error');
//         done();
//       });
//   });

//   it('should return an error for wrong email in params', (done) => {
//     chai.request(app)
//       .patch(`/api/v1/users/johnsnow12@gmail.com/${userToken}/reset-password`)
//       .send(data.resetPassword)
//       .end((err, res) => {
//         assert.equal((res.body.status), 404);
//         assert.property((res.body), 'error');
//         done();
//       });
//   });

//   it('should return an error for wrong token in params', (done) => {
//     chai.request(app)
//       .patch(`/api/v1/users/${userEmail}/563643847374738/reset-password`)
//       .send(data.resetPassword)
//       .end((err, res) => {
//         assert.equal((res.body.status), 401);
//         assert.property((res.body), 'error');
//         done();
//       });
//   });

//   it('should return a user object', (done) => {
//     chai.request(app)
//       .patch(`/api/v1/users/${userEmail}/${userToken}/reset-password`)
//       .send(data.resetPassword)
//       .end((err, res) => {
//         assert.equal((res.body.status), 200);
//         assert.property((res.body), 'data');
//         done();
//       });
//   });
// });
