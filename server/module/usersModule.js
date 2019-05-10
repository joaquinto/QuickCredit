import nJwt from 'njwt';
import idGenerator from '../helpers/idGenerator';
import User from '../model/users';
import userDb from '../storage/users.db';
import signToken from '../helpers/signToken';
import config from '../config/secretKey';
import hashPassword from '../helpers/hashPassword';
import comparePassword from '../helpers/comparePassword';
import userHelpers from '../helpers/userHelpers';
import emailNotification from '../helpers/sendGrid';

export default {
  signUpUser: async (req, next) => {
    const id = Number(idGenerator());
    const firstname = req.body.firstname.toLowerCase();
    const lastname = req.body.lastname.toLowerCase();
    const email = req.body.email.toLowerCase();
    const password = await hashPassword(req.body.password, next);
    const address = req.body.address.toLowerCase();
    const status = 'unverified';
    const isAdmin = false;
    const tokens = signToken(id, email, isAdmin, config.signingKey);

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
  },

  signInUser: async (req) => {
    const message = 'User password does not match';
    const email = req.body.email.toLowerCase();
    const password = req.body.password.toLowerCase();
    const [Users] = await userHelpers.getUserByEmail(userDb, email);
    const isMatch = await comparePassword(password, Users.password);
    if (isMatch) {
      const tokens = signToken(Users.id, Users.email, Users.isAdmin, config.signingKey);
      return { token: tokens, Users };
    }
    return { status: 405, error: message };
  },

  verifyUser: async (req) => {
    const { status } = req.body;
    const users = userHelpers.editUserStatusByEmail(userDb, req.params.email, status);
    return users;
  },

  deleteUser: async (req) => {
    const users = userHelpers.deleteUserByEmail(userDb, req.params.email);
    return users;
  },

  getUsers: async () => {
    const users = await userHelpers.getUsers(userDb);
    return users;
  },

  sendResetPassword: async (req) => {
    const userEmail = req.body.email;
    const emailFrom = 'Quick Credit  <noreply@quickcredit.com>';
    const subject = 'Quick Credit Password Reset';
    const [{ id, email, firstname }] = await userHelpers.getUserByEmail(userDb, userEmail);
    const token = nJwt.create({ id, email }, config.signingKey)
      .setExpiration(new Date().getTime() + (60 * 60 * 100)).compact();
    const text = `Hello ${firstname}, \n \nYou have requested a new password for your Quick Credit account. \n \nClick the following link to automatically confirm your reset: \n \n https://quickycredit.herokuapp.com/api/v1/users/${email}/${token}/reset-password\n \nThank you. \n \nQuick Credit Team`;
    emailNotification(emailFrom, email, subject, text);
    return { token, email };
  },

  resetUserPassword: async (req, next) => {
    const password = await hashPassword(req.body.password, next);
    const users = await userHelpers.resetUserPassword(userDb, req.params.email, password);
    return users;
  },
};
