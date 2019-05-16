import loanModule from '../module/loansModule';

export default class LoanController {
  static createLoan(req, res) {
    loanModule.createLoan(req)
      .then((data) => {
        res.status(201).json({ status: 201, data, message: 'Loan created successfully' });
      });
  }

  static getAllLoans(req, res) {
    const { status } = req.query;
    const { repaid } = req.query;
    if ((status !== undefined) && (repaid !== undefined)) {
      loanModule.getAllConditionalLoans(req)
        .then((data) => {
          if (data.length < 1) {
            res.status(400).json({ status: 400, error: 'No data to display' });
          }
          res.status(200).json({ status: 200, data, message: 'This operation was successful' });
        });
    } else {
      loanModule.getAllLoans()
        .then((data) => {
          res.status(200).json({ status: 200, data, message: 'This operation was successful' });
        });
    }
  }

  static getLoanById(req, res) {
    loanModule.getLoanById(req)
      .then((data) => {
        res.status(200).json({ status: 200, data, message: 'This operation was successful' });
      });
  }

  static approveLoan(req, res) {
    loanModule.approveLoan(req)
      .then((data) => {
        res.status(200).json({ status: 200, data, message: 'Loan was approved successfully' });
      });
  }
}
