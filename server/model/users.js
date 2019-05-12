/* eslint-disable no-param-reassign */
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

  static getUserByEmail(users, email) {
    return users.filter(user => (user.email === email));
  }

  static getUsers(users) {
    return users;
  }

  static editUserStatusByEmail(users, email, status) {
    const newUsers = users
      .filter(user => (user.email !== email));
    const newUser = users
      .filter(user => (user.email === email));
    newUser[0].status = status;
    newUsers.push(newUser);
    users = newUser;
    return newUser;
  }
}
