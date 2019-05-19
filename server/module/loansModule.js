import Loans from '../model/loans';
import loanDb from '../storage/loansDb';

export default class LoanModule {
  static async getAllLoans() {
    const loans = await Loans.getLoans(loanDb);
    return loans;
  }

  static async getAllConditionalLoans(req) {
    const { status, repaid } = req.query;
    const loans = await Loans.getConditionalLoans(loanDb, status, repaid);
    return loans;
  }

  static async getLoanById(req) {
    const loan = await Loans.getLoanById(loanDb, Number(req.params.id));
    return loan;
  }

  static async approveLoan(req) {
    const { status } = req.body;
    const loan = await Loans.editLoanStatusById(loanDb, Number(req.params.id), status);
    return loan;
  }
}
