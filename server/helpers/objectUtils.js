/* eslint-disable no-param-reassign */
export default class ObjectUtils {
  static userManipulation(users, email, manipulator) {
    const newUsers = users.filter(user => (user.email !== email));
    const newUser = users.filter(user => (user.email === email));
    newUser[0].manipulator = manipulator;
    newUsers.push(newUser);
    users = newUser;
    return newUser;
  }
}
