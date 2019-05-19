import userDb from '../storage/usersDb';
import db from '../db/index';
import loanDb from '../storage/loansDb';
import users from '../model/users';
import loans from '../model/loans';

const { query } = db;
const { findUserByEmail } = users;
const { getLoanByUserId } = loans;
export default class Authentication {
  static async isUserExist(req, res, next) {
    const { email } = req.body;
    const value = [email];
    try {
      const { rows } = await query(findUserByEmail, value);
      if (rows.length > 0) {
        res.status(409).json({ status: 409, error: 'User already exist' });
      }
      next();
    } catch (error) {
      console.log(error);
    }
  }

  static async notAUser(req, res, next) {
    const { email } = req.params;
    const value = email || req.body.email;
    try {
      const { rows } = await query(findUserByEmail, [value]);
      if (rows.length < 0) {
        res.status(404).json({ status: 404, error: 'User Not Found' });
      }
      next();
    } catch (error) {
      console.log(error);
    }
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

  static checkIsAccountVerified(req, res, next) {
    const [{ status }] = users.getUserByEmail(userDb, req.params.email);
    if (status === 'verified') {
      res.status(409).json({ status: 409, error: 'This account has been verified already' });
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
      res.status(409).json({ status: 409, error: 'you can\'t post repayment for into a fully repaid loan' });
    }
    next();
  }

  static checkIsLoanApproved(req, res, next) {
    const [{ status }] = loans.getLoanById(loanDb, Number(req.params.id));
    if (status === 'approved') {
      res.status(409).json({ status: 409, error: 'Loan has been approved already' });
    }
    next();
  }

  static checkIsLoanRepaid(req, res, next) {
    const [{ repaid }] = loans.getLoanById(loanDb, Number(req.params.id));
    if (repaid === true) {
      res.status(409).json({ status: 409, error: 'Loan has been fully repaid' });
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
    }
    next();
  }

  static async isLoanFullyRepaid(req, res, next) {
    try {
      const { rows } =  await query(getLoanByUserId, [req.decoded.id]);
      if (rows.length > 0) {
        const index = rows.length - 1;
        const { repaid, status } = rows[index];
        if ((repaid === false) || status === 'pending') {
          res.status(401).json({ status: 401, error: 'You must pay up your current loan before applying for another loan' });
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
