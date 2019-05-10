import idGenerator from '../helpers/idGenerator';
import Loans from '../model/loan';
import loanDb from '../storage/loans.db';
import loansHelpers from '../helpers/loansHelpers';
import paymentInstallments from '../helpers/paymentInstallment';
import interests from '../helpers/interest';

export default {
  createLoan: async (req) => {
    const id = Number(idGenerator());
    const firstname = req.body.firstname.toLowerCase();
    const lastname = req.body.lastname.toLowerCase();
    const email = req.body.email.toLowerCase();
    const createdOn = new Date();
    const status = 'pending';
    const repaid = false;
    let { tenor, amount } = req.body;
    tenor = Number(tenor);
    amount = Number(amount);
    const interest = interests(amount);
    const paymentInstallment = paymentInstallments(amount, interest, tenor);
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
  },

  getAllLoans: async () => {
    const loans = await loansHelpers.getLoans(loanDb);
    return loans;
  },

  getLoanById: async (req) => {
    const loan = await loansHelpers.getLoanById(loanDb, Number(req.params.id));
    return loan;
  },

  approveLoan: async (req) => {
    const { status } = req.body;
    const loan = await loansHelpers.editLoanStatusById(loanDb, Number(req.params.id), status);
    return loan;
  },

  getAllConditionalLoans: async (req) => {
    const { status, repaid } = req.query;
    const loans = await loansHelpers.getConditionalLoans(loanDb, status, repaid);
    return loans;
  },

};
