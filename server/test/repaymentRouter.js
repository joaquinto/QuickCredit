import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import data from './testData';

chai.use(chaiHttp);

describe('Create Repayments', () => {
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

  it('should throw an error for missing paid amount', (done) => {
    chai.request(app)
      .post('/api/v1/loans/41051150/repayment')
      .set('Authorization', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 405);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for missing token', (done) => {
    chai.request(app)
      .post('/api/v1/loans/41051150/repayment')
      .send(data.paidAmount)
      .end((err, res) => {
        assert.equal((res.body.status), 405);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error if the paid amount is not equal to the monthly installment payment', (done) => {
    chai.request(app)
      .post('/api/v1/loans/41051150/repayment')
      .set('Authorization', userToken)
      .send(data.paidAmountOne)
      .end((err, res) => {
        assert.equal((res.body.status), 405);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for invalid loan id', (done) => {
    chai.request(app)
      .post('/api/v1/loans/410511650/repayment')
      .set('Authorization', userToken)
      .send(data.paidAmountOne)
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should return a repaymant object', (done) => {
    chai.request(app)
      .post('/api/v1/loans/41051150/repayment')
      .set('Authorization', userToken)
      .send(data.paidAmount)
      .end((err, res) => {
        assert.equal((res.body.status), 201);
        assert.property((res.body), 'data');
        done();
      });
  });
});

describe('Get a single Repayments', () => {
  let userToken;
  const clientToken = 'hbfjnkjeknjvjrnkvrmk';
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
      .get('/api/v1/loans/41051150/repayments')
      .end((err, res) => {
        assert.equal((res.body.status), 405);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for invalid loan id', (done) => {
    chai.request(app)
      .get('/api/v1/loans/410511650/repayments')
      .set('Authorization', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for invalid token', (done) => {
    chai.request(app)
      .get('/api/v1/loans/41051150/repayments')
      .set('Authorization', clientToken)
      .end((err, res) => {
        assert.equal((res.body.status), 405);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should return a repeymant object', (done) => {
    chai.request(app)
      .get('/api/v1/loans/41051150/repayments')
      .set('Authorization', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body), 'data');
        done();
      });
  });
});

describe('Get all Repayments', () => {
  let userToken;
  const clientToken = 'hbfjnkjeknjvjrnkvrmk';
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
      .get('/api/v1/repayments')
      .end((err, res) => {
        assert.equal((res.body.status), 405);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should throw an error for invalid token', (done) => {
    chai.request(app)
      .get('/api/v1/repayments')
      .set('Authorization', clientToken)
      .end((err, res) => {
        assert.equal((res.body.status), 405);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('should return a repeymant object', (done) => {
    chai.request(app)
      .get('/api/v1/repayments')
      .set('Authorization', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body), 'data');
        done();
      });
  });
});
