import loanModule from '../module/loansModule';

export default class LoanController {
  static createLoan(req, res) {
    loanModule.createLoan(req)
      .then((data) => {
        res.status(201).json({ status: 201, data });
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
          res.status(200).json({ status: 200, data });
        });
    } else {
      loanModule.getAllLoans()
        .then((data) => {
          res.status(200).json({ status: 200, data });
        });
    }
  }
}
