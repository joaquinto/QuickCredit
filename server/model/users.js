/* eslint-disable no-param-reassign */
import objectUtils from '../helpers/objectUtils';

export default class Users {
  constructor(id, email, firstname, lastname, password, address, status, isAdmin) {
    this.id = id;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.address = address;
    this.status = status;
    this.isAdmin = isAdmin;
  }

  static getUserById(users, id) {
    return users.filter(user => (user.id === id));
  }

  static getUserByEmail(users, email) {
    return users.filter(user => (user.email === email));
  }

  static getUsers(users) {
    return users;
  }

  static editUserStatusByEmail(users, email, status) {
    const newUser = objectUtils.userManipulation(users, email, status);
    return newUser;
  }

  static deleteUserByEmail(users, email) {
    users = users
      .filter(user => (user.email !== email));
    return users;
  }

  static resetUserPassword(users, email, password) {
    const newUser = objectUtils.userManipulation(users, email, password);
    return newUser;
  }
}
