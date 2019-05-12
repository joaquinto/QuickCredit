import userDb from '../storage/usersDb';
import users from '../model/users';

export default class Authentication {
  static isUserExist(req, res, next) {
    const { email } = req.body;
    const user = users.getUserByEmail(userDb, email);
    if (user.length > 0) {
      res.status(401).json({ status: 401, error: 'User already exist' });
    }
    next();
  }

  static notAUser(req, res, next) {
    const { email } = req.params;
    const value = email || req.body.email;
    const user = users.getUserByEmail(userDb, value);
    if (user.length < 1) {
      res.status(404).json({ status: 404, error: 'User Not Found ...' });
    }
    next();
  }

  static isAdmin(req, res, next) {
    if (!req.decoded.admin) {
      res.status(401).json({ status: 401, error: 'Access Denied ... Unauthorized Access' });
    }
    next();
  }
}
