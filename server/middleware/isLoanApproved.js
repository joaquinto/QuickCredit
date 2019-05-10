import loanDb from '../storage/loans.db';
import loansHelpers from '../helpers/loansHelpers';

const isLoanApproved = (req, res, next) => {
  const { status } = loansHelpers.getLoanById(loanDb, req.params.id);
  if (status !== 'approved') {
    res.status(401).json({ status: 401, error: 'Access Denied ... Loan has not been approved' });
  }
  next();
};

export default isLoanApproved;
