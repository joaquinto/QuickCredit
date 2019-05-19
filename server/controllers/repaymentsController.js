import repaymentsModule from '../module/repaymentsModule';
import db from '../db/index';
import repayments from '../model/repayments';

const { query } = db;
const { getRepaymentsByLoanId } = repayments;

export default class RepaymentController {
  static createRepayment(req, res) {
    repaymentsModule.createRepayment(req)
      .then((data) => {
        res.status(201).json({ status: 201, data, message: 'Repayment created successfully' });
      }).catch(e => console.log(e));
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

  static getAllRepayments(req, res) {
    repaymentsModule.getRepayments()
      .then((data) => {
        res.status(200).json({ status: 200, data, message: 'Operation performed successfully' });
      }).catch(e => console.log(e));
  }
}
