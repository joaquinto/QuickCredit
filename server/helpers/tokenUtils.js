import nJwt from 'njwt';
import config from '../config/secretKey';

export default class Token {
  static signToken(userId, userEmail, isAdmin, key) {
    const token = nJwt.create({ id: userId, email: userEmail, admin: isAdmin }, key)
      .setExpiration(new Date().getTime() + (60 * 60 * 168000)).compact();
    return token;
  }

  static AuthenticateToken(req, res, next) {
    const token = req.headers.authorization || req.params.token;
    if (!token) {
      res.status(405).json({ status: 405, error: 'Access Denied ... No token provided' });
    } else {
      nJwt.verify(token, config.signingKey, (err, verified) => {
        if (err) {
          res.status(405).json({ status: 405, error: `Access Denied ... Token invalid: ${err}` });
        } else {
          req.decoded = verified.body;
          next();
        }
      });
    }
  }
}
