/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import Repayments from '../model/repayments';

const id = 1;
const createdOn = new Date();
const loanId = 5;
const amount = 5000.00;
const tenor = 4;
const interest = amount * 0.05;
const monthlyInstallment = (amount + interest) / tenor;
const paidAmount = 1050.00;
const balance = 3500.00;

const repayments = new Repayments(id, createdOn, loanId,
  amount, monthlyInstallment, paidAmount, balance);

describe('Test the repayment class', () => {
  it('There should be repayment class', () => {
    expect(repayments).to.exist;
  });

  it('the repayment class should be an object', () => {
    expect(repayments).to.be.an('object');
  });

  it('should have property id', () => {
    expect(repayments).property('id');
  });

  it('id should be a number', () => {
    expect(repayments.id).to.be.a('number');
  });

  it('should have property createdOn', () => {
    expect(repayments).property('createdOn');
  });

  it('createdOn should be a date', () => {
    expect(repayments.createdOn).to.be.a('date');
  });

  it('should have property loanId', () => {
    expect(repayments).property('loanId');
  });

  it('loanId should be a number', () => {
    expect(repayments.loanId).to.be.a('number');
  });

  it('should have property amount', () => {
    expect(repayments).property('amount');
  });

  it('amount should be a number', () => {
    expect(repayments.amount).to.be.a('number');
  });

  it('should have property monthly installment', () => {
    expect(repayments).property('monthlyInstallment');
  });

  it('monthly installment should be a number', () => {
    expect(repayments.amount).to.be.a('number');
  });

  it('should have property paid amount', () => {
    expect(repayments).property('paidAmount');
  });

  it('paid amount should be a number', () => {
    expect(repayments.amount).to.be.a('number');
  });

  it('should have property paid balance', () => {
    expect(repayments).property('balance');
  });

  it('balance should be a number', () => {
    expect(repayments.amount).to.be.a('number');
  });
});
