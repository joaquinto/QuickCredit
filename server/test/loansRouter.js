import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
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
        assert.equal((res.body.status), 405);
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
        assert.equal((res.body.status), 405);
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
        assert.equal((res.body.status), 405);
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
        assert.equal((res.body.status), 405);
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
        assert.equal((res.body.status), 405);
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

describe('Get all loans', () => {
  let userToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.signIn)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body), 'status');
        assert.property((res.body), 'data');
        assert.property((res.body.data), 'token');
        userToken = res.body.data.token;
        done();
      });
  });

  it('should throw an error for missing token', (done) => {
    chai.request(app)
      .get('/api/v1/loans')
      .end((err, res) => {
        assert.equal((res.body.status), 405);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should return an array of loan objects', (done) => {
    chai.request(app)
      .get('/api/v1/loans')
      .set('Authorization', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body), 'data');
        done();
      });
  });

  it('should return an error for invalid query string', (done) => {
    chai.request(app)
      .get('/api/v1/loans?status=approved&repaid=goinghome')
      .set('Authorization', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 405);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should return an array of loan objects', (done) => {
    chai.request(app)
      .get('/api/v1/loans?status=approved&repaid=true')
      .set('Authorization', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should return an array of loan objects', (done) => {
    chai.request(app)
      .get('/api/v1/loans?status=approved&repaid=false')
      .set('Authorization', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body), 'data');
        done();
      });
  });
});

describe('Get a single loan', () => {
  let userToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.signIn)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body), 'status');
        assert.property((res.body), 'data');
        assert.property((res.body.data), 'token');
        userToken = res.body.data.token;
        done();
      });
  });

  it('should throw an error for missing token', (done) => {
    chai.request(app)
      .get('/api/v1/loans/41051150')
      .end((err, res) => {
        assert.equal((res.body.status), 405);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for invalid loan id', (done) => {
    chai.request(app)
      .get('/api/v1/loans/410511540')
      .set('Authorization', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should return a loan objects', (done) => {
    chai.request(app)
      .get('/api/v1/loans/41051150')
      .set('Authorization', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body), 'data');
        done();
      });
  });
});

describe('Approve or reject a loan loan', () => {
  let userToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.signIn)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body), 'status');
        assert.property((res.body), 'data');
        assert.property((res.body.data), 'token');
        userToken = res.body.data.token;
        done();
      });
  });

  it('should throw an error for missing token', (done) => {
    chai.request(app)
      .patch('/api/v1/loans/41051150')
      .send(data.approve)
      .end((err, res) => {
        assert.equal((res.body.status), 405);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for invalid loan id', (done) => {
    chai.request(app)
      .patch('/api/v1/loans/410511540')
      .set('Authorization', userToken)
      .send(data.approve)
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should return a loan objects', (done) => {
    chai.request(app)
      .patch('/api/v1/loans/41051150')
      .set('Authorization', userToken)
      .send(data.approve)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body), 'data');
        done();
      });
  });

  it('should return a loan objects', (done) => {
    chai.request(app)
      .patch('/api/v1/loans/41051150')
      .set('Authorization', userToken)
      .send(data.reject)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body), 'data');
        done();
      });
  });
});
