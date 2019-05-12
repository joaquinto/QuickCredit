import loanModule from '../module/loansModule';

export default class LoanController {
  static createLoan(req, res) {
    loanModule.createLoan(req)
      .then((data) => {
        res.status(201).json({ status: 201, data });
      });
  }
}
