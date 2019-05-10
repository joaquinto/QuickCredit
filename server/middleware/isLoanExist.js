import loanDb from '../storage/loans.db';
import loansHelpers from '../helpers/loansHelpers';

const isLoanExist = (req, res, next) => {
  const { id } = req.params;
  const loan = loansHelpers.getLoanById(loanDb, Number(id));
  if (loan.length < 1) {
    res.status(404).json({ status: 404, error: 'Loan does not exist' });
  }
  next();
};

export default isLoanExist;
