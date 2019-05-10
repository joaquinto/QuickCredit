import loanDb from '../storage/loans.db';
import loansHelpers from '../helpers/loansHelpers';

const checkPaidAmount = (req, res, next) => {
  const paidAmount = req.body.paid_amount;
  const [{ paymentInstallment }] = loansHelpers.getLoanById(loanDb, Number(req.params.id));
  if (Number(paidAmount) !== Number(paymentInstallment)) {
    res.status(405).json({
      status: 405,
      error: `Can not process this payment because the
      amount paid is less than the required monthly installment payment`,
    });
  }
  next();
};

export default checkPaidAmount;
