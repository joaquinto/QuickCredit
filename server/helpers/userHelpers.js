/* eslint-disable no-param-reassign */
export default {
  getUsers: users => users,

  getUserById: (users, id) => users
    .filter(user => (user.id === id)),

  getUserByEmail: (users, email) => users
    .filter(user => (user.email === email)),

  deleteUserByEmail: (users, email) => {
    users = users
      .filter(user => (user.email !== email));
    return users;
  },

  editUserStatusByEmail: (users, email, status) => {
    const newUser = users
      .filter(user => (user.email !== email));
    const [Users] = users
      .filter(user => (user.email === email));
    Users.status = status;
    newUser.push(Users);
    users = newUser;
    return Users;
  },

  resetUserPassword: (users, email, password) => {
    const newUser = users
      .filter(user => (user.email !== email));
    const [Users] = users
      .filter(user => (user.email === email));
    Users.password = password;
    newUser.push(Users);
    users = newUser;
    return Users;
  },
};
