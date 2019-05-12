import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import data from './testData';

chai.use(chaiHttp);

describe('Signing Up', () => {
  it('should throw an error for missing firstname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data.missingFirstname)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for missing lastname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data.missingLastname)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for missing email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data.missingSignupEmail)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for missing password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data.missingSignupPassword)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for missing address', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data.missingSignupAddress)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return the user object', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data.signUp)
      .end((err, res) => {
        assert.equal((res.body.status), 201);
        assert.property((res.body), 'status');
        assert.property((res.body), 'data');
        assert.property((res.body.data), 'token');
        assert.property((res.body.data), 'id');
        assert.property((res.body.data), 'firstname');
        assert.property((res.body.data), 'lastname');
        assert.property((res.body.data), 'email');
        assert.property((res.body.data), 'password');
        assert.property((res.body.data), 'address');
        assert.property((res.body.data), 'status');
        assert.property((res.body.data), 'isAdmin');
        assert.equal((res.body.data.firstname), 'john');
        assert.equal((res.body.data.lastname), 'wick');
        assert.equal((res.body.data.email), 'johnwick@gmail.com');
        assert.equal((res.body.data.address), 'no 255 wallstreet, new york');
        assert.equal((res.body.data.status), 'unverified');
        done();
      });
  });

  it('should return status 200', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body), 'data');
        assert.equal((res.body.data), 'welcome to Quick Credit');
        done();
      });
  });
});

describe('Signing In', () => {
  it('should throw an error for missing email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.missingEmail)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for missing password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.missingPassword)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.invalidEmail)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for invalid password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.invalidPassword)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for wrong password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.signInWithWrongPassword)
      .end((err, res) => {
        assert.equal((res.body.status), 405);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return the user object', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.signIn)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body), 'status');
        assert.property((res.body), 'data');
        assert.property((res.body.data), 'token');
        assert.property((res.body.data), 'Users');
        assert.property((res.body.data.Users), 'id');
        assert.property((res.body.data.Users), 'firstname');
        assert.property((res.body.data.Users), 'lastname');
        assert.property((res.body.data.Users), 'email');
        assert.property((res.body.data.Users), 'password');
        assert.property((res.body.data.Users), 'address');
        assert.property((res.body.data.Users), 'status');
        assert.property((res.body.data.Users), 'isAdmin');
        assert.equal((res.body.data.Users.id), 49098877);
        assert.equal((res.body.data.Users.firstname), 'jonathan');
        assert.equal((res.body.data.Users.lastname), 'odjegba');
        assert.equal((res.body.data.Users.email), 'roejoeodj12@gmail.com');
        assert.equal((res.body.data.Users.status), 'verified');
        done();
      });
  });
});
