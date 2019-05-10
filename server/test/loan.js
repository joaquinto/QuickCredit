/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import Loan from '../model/loan';

const loanId = 5;
const firstname = 'jack';
const lastname = 'ojo';
const email = 'jack@gmail.com';
const createdOn = new Date();
const loanStatus = 'pending';
const repaid = false;
const tenor = 2;
const amount = 5000.01;
const paymentInstallment = 500.01;
const balance = 4500.01;
const interest = 5.01;

const loan = new Loan(loanId, firstname, lastname, email, createdOn, loanStatus, repaid,
  tenor, amount, paymentInstallment, balance, interest);


describe('Test the loan class', () => {
  it('should have the loan class', () => {
    expect(loan).to.exist;
  });

  it('Loan should be an object', () => {
    expect(loan).to.be.an('object');
  });

  it('loan should be an instance of Loan class', () => {
    expect(loan).instanceOf(Loan);
  });

  it('Loan class should have an id property', () => {
    expect(loan).property('id');
  });

  it('Loan class should have a firstname property', () => {
    expect(loan).property('firstname');
  });

  it('Loan class should have a lastname property', () => {
    expect(loan).property('lastname');
  });

  it('Loan class should have an email property', () => {
    expect(loan).property('email');
  });

  it('Loan class should have property createdOn', () => {
    expect(loan).property('createdOn');
  });

  it('Loan class should have property loanStatus', () => {
    expect(loan).property('status');
  });

  it('Loan class should have property repaid', () => {
    expect(loan).property('repaid');
  });

  it('Loan class should have property tenor', () => {
    expect(loan).property('tenor');
  });

  it('Loan class should have property anount', () => {
    expect(loan).property('amount');
  });

  it('Loan class should have property paymentInstallment', () => {
    expect(loan).property('paymentInstallment');
  });

  it('Loan class should have property balance', () => {
    expect(loan).property('balance');
  });

  it('Loan class should have property interest', () => {
    expect(loan).property('interest');
  });
});
