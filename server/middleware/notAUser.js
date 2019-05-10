import userDb from '../storage/users.db';
import userHelpers from '../helpers/userHelpers';

const notAUser = (req, res, next) => {
  const { email } = req.body;
  const user = userHelpers.getUserByEmail(userDb, email);
  if (user.length < 1) {
    res.status(404).json({ status: 404, error: 'User Not Found ...' });
  }
  next();
};

export default notAUser;
