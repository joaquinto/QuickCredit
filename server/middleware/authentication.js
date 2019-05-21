/* eslint-disable camelcase */
import db from '../db/index';
import users from '../model/users';
import loans from '../model/loans';

const { query } = db;
const { findUserByEmail, findUserById } = users;
const { getLoanByUserId, getLoanById, updateRepaid } = loans;

export default class Authentication {
  static async isUserExist(req, res, next) {
    const { email } = req.body;
    try {
      const { rows } = await query(findUserByEmail, [email]);
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

  static async isAccountVerified(req, res, next) {
    try {
      const { rows } = await query(findUserById, [req.decoded.id]);
      const [{ status }] = rows;
      if (status !== 'verified') {
        res.status(401).json({ status: 401, error: 'Access Denied ... Unauthorized Access' });
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  static async checkIsAccountVerified(req, res, next) {
    try {
      const { rows } = await query(findUserByEmail, [req.params.email]);
      const [{ status }] = rows;
      if (status === 'verified') {
        res.status(409).json({ status: 409, error: 'This account has been verified already' });
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  static async userNotVerified(req, res, next) {
    try {
      const { rows } = await query(findUserByEmail, [req.params.email]);
      const [{ status }] = rows;
      if (status !== 'verified') {
        res.status(409).json({ status: 409, error: 'This user is not verified, please verify this user before performing any other operation' });
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  static async isLoanExist(req, res, next) {
    const { id } = req.params;
    try {
      const { rows } = await query(getLoanById, [id]);
      if (rows.length < 1) {
        res.status(404).json({ status: 404, error: 'Loan does not exist' });
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  static async checkPaidAmount(req, res, next) {
    const paidAmount = req.body.paid_amount;
    try {
      const { rows } = await query(getLoanById, [req.params.id]);
      // eslint-disable-next-line camelcase
      const [{ payment_installment }] = rows;
      console.log(paidAmount, payment_installment);
      if (Number(paidAmount) !== Number(payment_installment)) {
        req.checkedBalance = false;
        console.log('>>>>>>>>>', req.checkedBalance);
        res.status(400).json({
          status: 400,
          error: `Can not process this payment because the
          amount paid is less than the required monthly installment payment`,
        });
      } else {
        req.checkedBalance = true;
        req.loan = rows;
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  static async checkIsLoanApproved(req, res, next) {
    try {
      const { rows } = await query(getLoanById, [req.params.id]);
      const [{ status }] = rows;
      if (status === 'approved') {
        res.status(409).json({ status: 409, error: 'Loan has been approved already' });
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  static async checkIsLoanRepaid(req, res, next) {
    try {
      const { rows } = await query(getLoanById, [req.params.id]);
      const [{ repaid }] = rows;
      if (repaid === true) {
        res.status(409).json({ status: 409, error: 'Loan has been fully repaid' });
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  static async updateRepayment(req, res, next) {
    try {
      const { rows } = await query(getLoanById, [req.params.id]);
      const [{ balance, payment_installment }] = rows;
      if (Number(balance) < Number(payment_installment)) {
        await query(updateRepaid, [true, req.params.id]);
      }
    } catch (error) {
      next(error);
    }
  }

  static async isOwnerOrAdmin(req, res, next) {
    const owner = req.decoded.email;
    try {
      const { rows } = await query(getLoanById, [req.params.id]);
      const [{ email }] = rows;
      if (!req.decoded.admin) {
        if (owner !== email) {
          res.status(401).json({ status: 401, error: 'Access Denied ... Unauthorized Access' });
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  static async isLoanFullyRepaid(req, res, next) {
    try {
      const { rows } = await query(getLoanByUserId, [req.decoded.id]);
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
