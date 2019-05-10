import loanDb from '../storage/loans.db';
import loansHelpers from '../helpers/loansHelpers';

const isOwner = (req, res, next) => {
  const owner = req.decoded.email;
  const [{ email }] = loansHelpers.getLoanById(loanDb, Number(req.params.id));
  console.log(email);
  if (owner !== email) {
    res.status(401).json({ status: 401, error: 'Access Denied ... Unauthorized Access' });
  }
  next();
};

export default isOwner;
