import Repayments from '../model/repaymants';
import repaymantsHelpers from '../helpers/repaymentsHelpers';
import repaymentDb from '../storage/repayments.db';
import loanHelpers from '../helpers/loansHelpers';
import idGenerator from '../helpers/idGenerator';
import loanDb from '../storage/loans.db';
import balanceCalculator from '../helpers/balanceCalculator';
import emailNotification from '../helpers/sendGrid';

export default {
  createRepayment: async (req) => {
    const repaymentId = Number(idGenerator());
    const [{
      id, firstname, email, amount, balance, paymentInstallment,
    }] = loanHelpers
      .getLoanById(loanDb, Number(req.params.id));
    const createdOn = new Date();
    const paidAmount = req.body.paid_amount;
    const loanBalance = balanceCalculator(Number(balance), Number(paidAmount));

    await loanHelpers.getNewBalance(loanDb, Number(req.params.id), loanBalance.toFixed(2));

    const emailFrom = 'Quick Credit  <noreply@quickcredit.com>';
    const subject = 'Loan Repayment Transaction Notification';
    const text = `Hello ${firstname}, \n \nYou have paid in ${paidAmount} as your normal monthly installment payment. \n \nYour Balance is ${loanBalance}.\n \nThank you. \n \nQuick Credit Team`;

    const repayment = await new Repayments(repaymentId, createdOn,
      id, amount, paymentInstallment, Number(paidAmount).toFixed(2), loanBalance.toFixed(2));
    repaymentDb.push(repayment);
    emailNotification(emailFrom, email, subject, text);
    return {
      id: repayment.id,
      loanId: repayment.loanId,
      createdOn: repayment.createdOn,
      amount: repayment.amount,
      monthlyInstallment: repayment.monthlyInstallment,
      paidAmount: repayment.paidAmount,
      balance: repayment.balance,
    };
  },

  getRepaymentByLoanId: async (req) => {
    const repayments = await repaymantsHelpers
      .getRepaymentsByLoanId(repaymentDb, Number(req.params.id));
    return repayments;
  },

  getRepayments: async () => {
    const repayments = await repaymantsHelpers.getRepayments(repaymentDb);
    return repayments;
  },
};
