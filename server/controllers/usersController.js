/* eslint-disable camelcase */
/* eslint-disable max-len */
import generator from 'generate-password';
import jwtTokenUtils from '../helpers/jwtTokenUtils';
import passwordUtils from '../helpers/passwordUtils';
import utilities from '../helpers/utilities';
import db from '../db/index';
import user from '../model/users';

const { query } = db;
const {
  createUser, findUserByEmail,
  updatePassword, verifyUser,
} = user;
const { sendPasswordNotification } = utilities;
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

  static async verifyUser(req, res, next) {
    const { status } = req.body;
    try {
      const { rows } = await query(verifyUser, [status, req.params.email]);
      const [{
        id, first_name: firstname, last_name: lastname, email,
        address, status: UserStatus, is_admin: isAdmin,
      }] = rows;
      const response = {
        id,
        firstname,
        lastname,
        email,
        address,
        UserStatus,
        isAdmin,
      };
      res.status(200).json({ status: 200, message: 'User has been verified successfully', data: response });
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      if (req.body.password === undefined) {
        const generatedPassword = generator.generate({
          length: 12,
          numbers: true,
          symbols: false,
        });
        const hashedPassword = await passwordUtils.hashPassword(generatedPassword, next);
        const { rows } = await query(updatePassword, [hashedPassword, req.params.email]);
        const [{ first_name, email }] = rows;
        sendPasswordNotification(first_name, email, generatedPassword);
        res.status(200).json({ status: 204 });
      } else {
        await query(updatePassword, [req.body.password, req.params.email]);
        res.status(200).json({ status: 204 });
      }
    } catch (error) {
      next(error);
    }
  }
}
