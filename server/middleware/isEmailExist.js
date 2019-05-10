import userDb from '../storage/users.db';
import userHelpers from '../helpers/userHelpers';

const isEmailExist = (req, res, next) => {
  const { email } = req.params;
  const value = email || req.body.email;
  const user = userHelpers.getUserByEmail(userDb, value);
  if (user.length < 1) {
    res.status(404).json({ status: 404, error: 'Email does not exist' });
  }
  next();
};

export default isEmailExist;
