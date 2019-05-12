import utilities from '../helpers/utilities';
import User from '../model/users';
import userDb from '../storage/usersDb';
import tokenUtils from '../helpers/tokenUtils';
import config from '../config/secretKey';
import passwordUtils from '../helpers/passwordUtils';

export default class UsersModule {
  static async signUpUser(req, next) {
    const id = Number(utilities.idGenerator());
    const firstname = req.body.firstname.toLowerCase();
    const lastname = req.body.lastname.toLowerCase();
    const email = req.body.email.toLowerCase();
    const password = await passwordUtils.hashPassword(req.body.password, next);
    const address = req.body.address.toLowerCase();
    const status = 'unverified';
    const isAdmin = false;
    const tokens = tokenUtils.signToken(id, email, isAdmin, config.signingKey);

    const user = await new User(id, email, firstname, lastname,
      password, address, status, isAdmin);
    userDb.push(user);
    return {
      token: tokens,
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      password: user.password,
      status: user.status,
      isAdmin: user.isAdmin,
    };
  }

  static async signInUser(req) {
    const message = 'User password does not match';
    const email = req.body.email.toLowerCase();
    const password = req.body.password.toLowerCase();
    const [Users] = await User.getUserByEmail(userDb, email);
    const isMatch = await passwordUtils.comparePassword(password, Users.password);
    if (isMatch) {
      const tokens = tokenUtils.signToken(Users.id, Users.email, Users.isAdmin, config.signingKey);
      return { token: tokens, Users };
    }
    return { status: 405, error: message };
  }

  static async getUsers() {
    const users = await User.getUsers(userDb);
    return users;
  }
}
