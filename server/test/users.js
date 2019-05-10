/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import Users from '../model/users';

const id = 3;
const email = 'jack@gmail.com';
const firstname = 'jack';
const lastname = 'snow';
const password = 'jjenfkenkfnken';
const address = '23, jekins street, NY';
const status = 'lol';
const isAdmin = true;

const users = new Users(id, email, firstname, lastname, password, address, status, isAdmin);

describe('check for the users class', () => {
  it('should have the users class', () => {
    expect(users).to.exist;
  });

  it('users should be an object', () => {
    expect(users).to.be.an('object');
  });

  it('users should be an instance of the Users class', () => {
    expect(users).to.be.an.instanceof(Users);
  });

  it('should have id property', () => {
    expect(users).property('id');
  });

  it('id property should be a string', () => {
    expect(users).property('id').to.be.a('number');
  });

  it('should have email property', () => {
    expect(users).property('email');
  });

  it('email property should be a string', () => {
    expect(users).property('email').to.be.a('string');
  });

  it('should have firstname property', () => {
    expect(users).property('firstname');
  });

  it('firstname property should be a string', () => {
    expect(users).property('firstname').to.be.a('string');
  });

  it('should have lastname property', () => {
    expect(users).property('lastname');
  });

  it('lastname property should be a string', () => {
    expect(users).property('lastname').to.be.a('string');
  });

  it('should have password property', () => {
    expect(users).property('password');
  });

  it('password property should be a string', () => {
    expect(users).property('password').to.be.a('string');
  });

  it('should have address property', () => {
    expect(users).property('address');
  });

  it('address property should be a string', () => {
    expect(users).property('address').to.be.a('string');
  });

  it('should have status property', () => {
    expect(users).property('status');
  });

  it('status property should be a string', () => {
    expect(users).property('status').to.be.a('string');
  });

  it('should have isAdmin property', () => {
    expect(users).property('isAdmin');
  });

  it('isAdmin property should be of boolean type', () => {
    expect(users).property('isAdmin').to.be.a('boolean');
  });
});
