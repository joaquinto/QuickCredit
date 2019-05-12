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
}
