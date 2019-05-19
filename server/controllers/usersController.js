import userModule from '../module/usersModule';
import jwtTokenUtils from '../helpers/jwtTokenUtils';
import passwordUtils from '../helpers/passwordUtils';
import db from '../db/index';
import user from '../model/users';

const { query } = db;
const { createUser, findUserByEmail } = user;
const { signToken } = jwtTokenUtils;

export default class UserController {
  static async signUp(req, res, next) {
    const { firstname, lastname } = req.body;
    const email = req.body.email.toLowerCase();
    const password = await passwordUtils.hashPassword(req.body.password.toLowerCase(), next);
    const address = req.body.address.toLowerCase();
    const status = 'unverified';
    const isAdmin = false;
    const values = [firstname, lastname, email, password, address, status, isAdmin];
    try {
      const { rows } = await query(createUser, values);
      const tokens = await signToken(rows[0].id, rows[0].email, rows[0].is_admin);
      const response = {
        token: tokens,
        id: rows[0].id,
        firstname: rows[0].first_name,
        lastname: rows[0].last_name,
        email: rows[0].email,
        address: rows[0].address,
        status: rows[0].status,
        isAdmin: rows[0].is_admin,
      };
      res.status(201).json({ status: 201, message: 'User created successfully', response });
    } catch (error) {
      next(error);
    }
  }

  static async signIn(req, res, next) {
    const message = 'User password does not match';
    const email = req.body.email.toLowerCase();
    const password = req.body.password.toLowerCase();
    try {
      const { rows } = await query(findUserByEmail, [email]);
      const isMatch = await passwordUtils.comparePassword(password, rows[0].password);
      if (isMatch) {
        const tokens = signToken(rows[0].id, rows[0].email, rows[0].is_admin);
        const response = {
          token: tokens,
          id: rows[0].id,
          firstname: rows[0].first_name,
          lastname: rows[0].last_name,
          email: rows[0].email,
          address: rows[0].address,
          status: rows[0].status,
          isAdmin: rows[0].is_admin,
        };
        res.status(200).json({ status: 200, message: 'Logged in successfully', response });
      } else {
        res.status(405).json({ status: 405, error: message });
      }
    } catch (error) {
      next(error);
    }
  }

  static getUsers(req, res) {
    userModule.getUsers()
      .then((data) => {
        res.status(200).json({ status: 200, data, message: 'The operation you performed was successful' });
      });
  }

  static verifyUser(req, res) {
    userModule.verifyUser(req)
      .then((data) => {
        res.status(200).json({ status: 200, data, message: 'User verified successfully' });
      });
  }

  static deleteUser(req, res) {
    userModule.deleteUser(req)
      .then((data) => {
        res.status(200).json({ status: 200, data, message: 'User deleted successfully' });
      });
  }

  static sendResetPasswordLink(req, res) {
    userModule.sendResetPasswordLink(req)
      .then((data) => {
        res.status(200).json({ status: 200, data: { token: data.token, email: data.email }, message: 'check your email for a password reset link' });
      });
  }

  static resetPasswordView(req, res) {
    res.status(200).json({ status: 200, data: 'This is the reset password view', message: 'This operation was successful' });
  }

  static resetUserPassword(req, res) {
    userModule.resetUserPassword(req)
      .then((data) => {
        res.status(200).json({ status: 200, data, message: 'Password reset successfully' });
      });
  }
}
