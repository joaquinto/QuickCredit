import users from '../storage/users.db';
import usersHelpers from '../helpers/userHelpers';

const isAccountVerified = (req, res, next) => {
  const [{ status }] = usersHelpers.getUserById(users, req.decoded.id);
  if (status !== 'verified') {
    res.status(401).json({ status: 401, error: 'Access Denied ... Unauthorized Access' });
  }
  next();
};

export default isAccountVerified;
