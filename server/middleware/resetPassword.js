import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import passwordUtils from '../helpers/passwordUtils';

dotenv.config();

export default class ResetPassword {
  static async resetPassword(req, res, next) {
    if (req.body.password !== undefined) {
      const [{ password }] = req.user;
      const isMatch = await passwordUtils.comparePassword(req.body.password, password);
      if (!isMatch) {
        res.status(409).json({ status: 409, error: 'Your old password does not match' });
      }
    }
    next();
  }

  static verifyResetToken(req, res, next) {
    if (req.body.password !== undefined) {
      console.log(req.body.password);
      const key = process.env.SECRET_KEY;
      const token = req.headers.authorization;
      if (!token) {
        res.status(403).json({ status: 403, error: 'No token provided' });
      }
      jwt.verify(token, key, (error, decoded) => {
        if (error) {
          res.status(401).json({ status: 401, error: 'Invalid token provided' });
        }
        req.decoded = decoded;
      });
    }
    next();
  }
}
