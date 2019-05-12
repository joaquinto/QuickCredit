import repaymentsModule from '../module/repaymentsModule';

export default class RepaymentController {
  static createRepayment(req, res) {
    repaymentsModule.createRepayment(req)
      .then((data) => {
        res.status(201).json({ status: 201, data });
      });
  }

  static getRepaymentsByLoanId(req, res) {
    repaymentsModule.getRepaymentByLoanId(req)
      .then((data) => {
        res.status(200).json({ status: 200, data });
      });
  }

  static getAllRepayments(req, res) {
    repaymentsModule.getRepayments()
      .then((data) => {
        res.status(200).json({ status: 200, data });
      });
  }
}
