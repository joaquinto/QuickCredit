import objectUtils from '../helpers/objectUtils';

const userQueries = {
  createUser: `INSERT INTO users(first_name, last_name, email, password, address, status, is_admin) 
  VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,

  findUserByEmail: `SELECT * FROM users WHERE email = $1`,

  verifyUser: `UPDATE users SET status = $1 WHERE email = $2 RETURNING *`,
};

export default userQueries;

// export default class Users {
//   // constructor(id, email, firstname, lastname, password, address, status, isAdmin) {
//   //   this.id = id;
//   //   this.email = email;
//   //   this.firstname = firstname;
//   //   this.lastname = lastname;
//   //   this.password = password;
//   //   this.address = address;
//   //   this.status = status;
//   //   this.isAdmin = isAdmin;
//   // }

//   static getUserById(users, id) {
//     return users.filter(user => (user.id === id));
//   }

//   static getUserByEmail(users, email) {
//     return users.filter(user => (user.email === email));
//   }

//   static getUsers(users) {
//     return users;
//   }

//   static editUserStatusByEmail(users, email, status) {
//     const newUser = objectUtils.userManipulation(users, email, status);
//     return newUser;
//   }

//   static deleteUserByEmail(users, email) {
//     users = users
//       .filter(user => (user.email !== email));
//     return users;
//   }

//   static resetUserPassword(users, email, password) {
//     const newUser = objectUtils.userManipulation(users, email, password);
//     return newUser;
//   }
// }
