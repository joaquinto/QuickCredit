import emailUtility from '../helpers/emailUtils';
import User from '../model/users';
import userDb from '../storage/usersDb';
import jwtTokenUtils from '../helpers/jwtTokenUtils';
import passwordUtils from '../helpers/passwordUtils';

const { signToken } = jwtTokenUtils;

export default class UsersModule {
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
    const token = signToken(id, email, firstname);
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
