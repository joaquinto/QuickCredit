import utilities from '../helpers/utilities';
import Loans from '../model/loans';
import repaymentDb from '../storage/repaymentsDb';
import emailUtils from '../helpers/emailUtils';
import loanDb from '../storage/loansDb';
import Repayments from '../model/repayments';

export default class RepaymentsModule {
  static async createRepayment(req) {
    const repaymentId = Number(utilities.idGenerator());
    const [{
      id, firstname, email, amount, balance, paymentInstallment,
    }] = Loans
      .getLoanById(loanDb, Number(req.params.id));
    const createdOn = new Date();
    const paidAmount = req.body.paid_amount;
    const loanBalance = utilities.balanceCalculator(Number(balance), Number(paidAmount));

    await Loans.getNewBalance(loanDb, Number(req.params.id), loanBalance.toFixed(2));

    const emailFrom = 'Quick Credit  <noreply@quickcredit.com>';
    const subject = 'Loan Repayment Transaction Notification';
    const text = `Hello ${firstname}, \n \nYou have paid in ${paidAmount} as your normal monthly installment payment. \n \nYour Balance is ${loanBalance}.\n \nThank you. \n \nQuick Credit Team`;

    const repayment = await new Repayments(repaymentId, createdOn,
      id, amount, paymentInstallment, Number(paidAmount).toFixed(2), loanBalance.toFixed(2));
    repaymentDb.push(repayment);
    emailUtils(emailFrom, email, subject, text);
    return {
      id: repayment.id,
      loanId: repayment.loanId,
      createdOn: repayment.createdOn,
      amount: repayment.amount,
      monthlyInstallment: repayment.monthlyInstallment,
      paidAmount: repayment.paidAmount,
      balance: repayment.balance,
    };
  }

  static async getRepaymentByLoanId(req) {
    const repayments = await Repayments
      .getRepaymentsByLoanId(repaymentDb, Number(req.params.id));
    return repayments;
  }
}
