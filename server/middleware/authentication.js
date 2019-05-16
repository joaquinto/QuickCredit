import userDb from '../storage/usersDb';
import loanDb from '../storage/loansDb';
import users from '../model/users';
import loans from '../model/loans';

export default class Authentication {
  static isUserExist(req, res, next) {
    const { email } = req.body;
    const user = users.getUserByEmail(userDb, email);
    if (user.length > 0) {
      res.status(401).json({ status: 409, error: 'User already exist' });
    }
    next();
  }

  static notAUser(req, res, next) {
    const { email } = req.params;
    const value = email || req.body.email;
    const user = users.getUserByEmail(userDb, value);
    if (user.length < 1) {
      res.status(404).json({ status: 404, error: 'User Not Found' });
    }
    next();
  }

  static isAdmin(req, res, next) {
    if (!req.decoded.admin) {
      res.status(401).json({ status: 401, error: 'Access Denied ... Unauthorized Access' });
    }
    next();
  }

  static isClient(req, res, next) {
    if (req.decoded.admin) {
      res.status(401).json({ status: 401, error: 'Access Denied ... Unauthorized Access' });
    }
    next();
  }

  static isAccountVerified(req, res, next) {
    const [{ status }] = users.getUserById(userDb, req.decoded.id);
    if (status !== 'verified') {
      res.status(401).json({ status: 401, error: 'Access Denied ... Unauthorized Access' });
    }
    next();
  }

  static isLoanExist(req, res, next) {
    const { id } = req.params;
    const loan = loans.getLoanById(loanDb, Number(id));
    if (loan.length < 1) {
      res.status(404).json({ status: 404, error: 'Loan does not exist' });
    }
    next();
  }

  static checkPaidAmount(req, res, next) {
    const paidAmount = req.body.paid_amount;
    const [{ paymentInstallment, repaid }] = loans.getLoanById(loanDb, Number(req.params.id));
    if (Number(paidAmount) !== Number(paymentInstallment)) {
      res.status(400).json({
        status: 400,
        error: `Can not process this payment because the
        amount paid is less than the required monthly installment payment`,
      });
    } else if (repaid === true) {
      res.status(400).json({ status: 400, error: 'you can\'t post repayment for into a fully repaid loan' });
    }
    next();
  }

  static checkIsLoanApproved(req, res, next) {
    const [{ status }] = loans.getLoanById(loanDb, Number(req.params.id));
    if (status === 'approved') {
      res.status().json({ status: 409, error: 'Loan has been approved already' });
    }
    next();
  }

  static isOwnerOrAdmin(req, res, next) {
    const owner = req.decoded.email;
    const [{ email }] = loans.getLoanById(loanDb, Number(req.params.id));
    if (!req.decoded.admin) {
      if (owner !== email) {
        res.status(401).json({ status: 401, error: 'Access Denied ... Unauthorized Access' });
      }
      next();
    }
    next();
  }
}
