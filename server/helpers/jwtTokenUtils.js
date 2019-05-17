import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class JwtToken {
  static signToken(userId, userEmail, isAdmin) {
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ id: userId, email: userEmail, admin: isAdmin }, key, { expiresIn: '1h' });
    return token;
  }

  static verifyToken(req, res, next) {
    const key = process.env.SECRET_KEY;
    const token = req.headers.authorization || req.params.token;
    if (!token) {
      res.status(403).json({ status: 403, error: 'No token provided' });
    }
    jwt.verify(token, key, (error, decoded) => {
      if (error) {
        res.status(401).json({ status: 401, error: 'Invalid token provided' });
      }
      req.decoded = decoded;
      next();
    });
  }
}
