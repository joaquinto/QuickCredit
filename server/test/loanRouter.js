import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import data from './testData';

chai.use(chaiHttp);

describe('Create a loan', () => {
  let userToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.client)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body), 'status');
        assert.property((res.body), 'data');
        assert.property((res.body.data), 'token');
        userToken = res.body.data.token;
        done();
      });
  });

  it('should throw an error for missing firstname', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
      .set('Authorization', userToken)
      .send(data.loanMissingFirstname)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for missing lastname', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
      .set('Authorization', userToken)
      .send(data.loanMissingLastname)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for missing email', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
      .set('Authorization', userToken)
      .send(data.loanMissingEmail)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for missing tenor', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
      .set('Authorization', userToken)
      .send(data.loanMissingTenor)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for missing amount', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
      .set('Authorization', userToken)
      .send(data.loanMissingAmount)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for missing token', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
      .send(data.loan)
      .end((err, res) => {
        assert.equal((res.body.status), 405);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for missing loan object', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
      .end((err, res) => {
        assert.equal((res.body.status), 405);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should return a loan object', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
      .set('Authorization', userToken)
      .send(data.loan)
      .end((err, res) => {
        assert.equal((res.body.status), 201);
        assert.property((res.body), 'data');
        done();
      });
  });
});
