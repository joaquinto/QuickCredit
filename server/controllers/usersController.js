/* eslint-disable camelcase */
/* eslint-disable max-len */
import jwtTokenUtils from '../helpers/jwtTokenUtils';
import passwordUtils from '../helpers/passwordUtils';
import db from '../db/index';
import user from '../model/users';

const { query } = db;
const { createUser, findUserByEmail, verifyUser } = user;
const { signToken } = jwtTokenUtils;

export default class UserController {
  static async signUp(req, res, next) {
    const { firstname, lastname } = req.body;
    const userEmail = req.body.email.toLowerCase();
    const userPassword = await passwordUtils.hashPassword(req.body.password.toLowerCase(), next);
    const userAddress = req.body.address.toLowerCase();
    const userStatus = 'unverified';
    const isAdmin = false;
    const values = [firstname, lastname, userEmail, userPassword, userAddress, userStatus, isAdmin];
    try {
      const { rows } = await query(createUser, values);
      const [{
        id, first_name, last_name, email,
        address, status, is_admin,
      }] = rows;
      const tokens = await signToken(id, email, is_admin);
      const data = {
        token: tokens,
        id,
        firstname: first_name,
        lastname: last_name,
        email,
        address,
        status,
        isAdmin: is_admin,
      };
      res.status(201).json({ status: 201, message: 'User created successfully', data });
    } catch (error) {
      next(error);
    }
  }

  static async signIn(req, res, next) {
    const message = 'User password does not match';
    const userEmail = req.body.email.toLowerCase();
    const userPassword = req.body.password.toLowerCase();
    try {
      const { rows } = await query(findUserByEmail, [userEmail]);
      const [{
        id, first_name, last_name, email,
        password, address, status, is_admin,
      }] = rows;
      const isMatch = await passwordUtils.comparePassword(userPassword, password);
      if (isMatch) {
        const tokens = signToken(id, email, is_admin);
        const data = {
          token: tokens,
          id,
          firstname: first_name,
          lastname: last_name,
          email,
          address,
          status,
          isAdmin: is_admin,
        };
        res.status(200).json({ status: 200, message: 'Logged in successfully', data });
      } else {
        res.status(405).json({ status: 405, error: message });
      }
    } catch (error) {
      next(error);
    }
  }

  // static getUsers(req, res) {
  //   userModule.getUsers()
  //     .then((data) => {
  //       res.status(200).json({ status: 200, data, message: 'The operation you performed was successful' });
  //     });
  // }

  static async verifyUser(req, res, next) {
    const { status } = req.body;
    try {
      const { rows } = await query(verifyUser, [status, req.params.email]);
      res.status(200).json({ status: 200, message: 'User has been verified successfully', data: rows[0] });
    } catch (error) {
      next(error);
    }
  }

  // static deleteUser(req, res) {
  //   userModule.deleteUser(req)
  //     .then((data) => {
  //       res.status(200).json({ status: 200, data, message: 'User deleted successfully' });
  //     });
  // }

  // static sendResetPasswordLink(req, res) {
  //   userModule.sendResetPasswordLink(req)
  //     .then((data) => {
  //       res.status(200).json({ status: 200, data: { token: data.token, email: data.email }, message: 'check your email for a password reset link' });
  //     });
  // }

  // static resetPasswordView(req, res) {
  //   res.status(200).json({ status: 200, data: 'This is the reset password view', message: 'This operation was successful' });
  // }

  // static resetUserPassword(req, res) {
  //   userModule.resetUserPassword(req)
  //     .then((data) => {
  //       res.status(200).json({ status: 200, data, message: 'Password reset successfully' });
  //     });
  // }
}
