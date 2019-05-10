import nJwt from 'njwt';
import config from '../config/secretKey';

const authenticate = (req, res, next) => {
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
};

export default authenticate;
