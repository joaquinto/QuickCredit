import userDb from '../storage/users.db';
import userHelpers from '../helpers/userHelpers';

const isUserExist = (req, res, next) => {
  const { email } = req.body;
  const user = userHelpers.getUserByEmail(userDb, email);
  if (user.length > 0) {
    res.status(401).json({ status: 401, error: 'User already exist' });
  }
  next();
};

export default isUserExist;
