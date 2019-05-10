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
}
