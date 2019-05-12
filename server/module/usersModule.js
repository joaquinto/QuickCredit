import nJwt from 'njwt';
import emailUtility from '../helpers/emailUtils';
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

  static async verifyUser(req) {
    const { status } = req.body;
    const users = User.editUserStatusByEmail(userDb, req.params.email, status);
    return users;
  }

  static async deleteUser(req) {
    const users = User.deleteUserByEmail(userDb, req.params.email);
    return users;
  }

  static async sendResetPasswordLink(req) {
    const userEmail = req.body.email;
    const emailFrom = 'Quick Credit  <noreply@quickcredit.com>';
    const subject = 'Quick Credit Password Reset';
    const [{ id, email, firstname }] = await User.getUserByEmail(userDb, userEmail);
    const token = nJwt.create({ id, email }, config.signingKey)
      .setExpiration(new Date().getTime() + (60 * 60 * 100)).compact();
    const text = `Hello ${firstname}, \n \nYou have requested a new password for your Quick Credit account. \n \nClick the following link to automatically confirm your reset: \n \n https://quickycredit.herokuapp.com/api/v1/users/${email}/${token}/reset-password\n \nThank you. \n \nQuick Credit Team`;
    emailUtility(emailFrom, email, subject, text);
    return { token, email };
  }

  static async resetUserPassword(req, next) {
    const password = await passwordUtils.hashPassword(req.body.password, next);
    const users = await User.resetUserPassword(userDb, req.params.email, password);
    return users;
  }
}
