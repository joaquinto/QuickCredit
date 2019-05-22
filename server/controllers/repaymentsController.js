/* eslint-disable camelcase */
import db from '../db/index';
import loan from '../model/loans';
import utilities from '../helpers/utilities';
import repayments from '../model/repayments';
import authentication from '../middleware/authentication';

const {
  sendRepaymentNotification, response, postRepayment, balanceCalculator,
} = utilities;
const { updateRepayment } = authentication;
const { query } = db;
// eslint-disable-next-line no-unused-vars
const { updateBalance } = loan;
const { getRepaymentsByLoanId, postRepayments, getRepayments } = repayments;

export default class RepaymentController {
  static async createRepayment(req, res, next) {
    if (req.checkedBalance === false) {
      console.log('error happened');
    } else {
      try {
        const [{
          id, first_name, email, amount, balance, payment_installment,
        }] = req.loan;
        const createdOn = new Date();
        const paidAmount = req.body.paid_amount;
        const loanBalance = balanceCalculator(Number(balance), Number(paidAmount));
        const value = [id, createdOn, amount, payment_installment,
          paidAmount, loanBalance];
        const result = await postRepayment(postRepayments, value, next);
        sendRepaymentNotification(first_name, email, paidAmount, loanBalance);
        await query(updateBalance, [loanBalance, req.params.id]);
        await updateRepayment(req, next);
        res.status(201).json({ status: 201, message: 'Repayment created successfully', data: response(result) });
      } catch (error) {
        next(error);
      }
    }
  }

  static async getRepaymentsByLoanId(req, res, next) {
    try {
      const { rows } = await query(getRepaymentsByLoanId, [req.params.id]);
      if (rows.length < 1) {
        res.status(404).json({ status: 404, error: 'No repayment history to display' });
      } else {
        res.status(200).json({ status: 200, message: 'repayment history was displayed successfully', data: rows });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getAllRepayments(req, res, next) {
    try {
      const { rows } = await query(getRepayments);
      res.status(200).json({ status: 200, message: 'Repayments has been fetched successfully', data: rows });
    } catch (error) {
      next(error);
    }
  }
}
