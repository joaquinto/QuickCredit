import Loans from '../model/loans';
import loanDb from '../storage/loansDb';
import utilities from '../helpers/utilities';

export default class LoanModule {
  static async createLoan(req) {
    const id = Number(utilities.idGenerator());
    const firstname = req.body.firstname.toLowerCase();
    const lastname = req.body.lastname.toLowerCase();
    const email = req.body.email.toLowerCase();
    const createdOn = new Date();
    const status = 'pending';
    const repaid = false;
    let { tenor, amount } = req.body;
    tenor = Number(tenor);
    amount = Number(amount);
    const interest = utilities.interest(amount);
    const paymentInstallment = utilities.paymentInstallment(amount, interest, tenor);
    amount += interest;
    const balance = amount;

    const loan = await new Loans(id, firstname, lastname, email,
      createdOn, status, repaid, tenor, amount.toFixed(2),
      paymentInstallment.toFixed(2), balance.toFixed(2),
      interest.toFixed(2));
    loanDb.push(loan);
    return {
      id: loan.id,
      firstname: loan.firstname,
      lastname: loan.lastname,
      email: loan.email,
      createdOn: loan.createdOn,
      status: loan.status,
      repaid: loan.repaid,
      tenor: loan.tenor,
      amount: loan.amount,
      paymentInstallment: loan.paymentInstallment,
      balance: loan.balance,
      interest: loan.interest,
    };
  }

  static async getAllLoans() {
    const loans = await Loans.getLoans(loanDb);
    return loans;
  }

  static async getAllConditionalLoans(req) {
    const { status, repaid } = req.query;
    const loans = await Loans.getConditionalLoans(loanDb, status, repaid);
    return loans;
  }
}
