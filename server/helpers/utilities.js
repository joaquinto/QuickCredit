/* eslint-disable no-plusplus */
import emailUtils from './emailUtils';
import db from '../db/index';

const { query } = db;

export default class Utilities {
  static paymentInstallment(amount, interest, tenor) {
    return (amount + interest) / tenor;
  }

  static interest(amount) {
    return amount * 0.05;
  }

  static balanceCalculator(loan, repayment) {
    return loan.toFixed(2) - repayment.toFixed(2);
  }

  static sendRepaymentNotification(firstName, email, paidAmount, loanBalance) {
    const emailFrom = 'Quick Credit  <noreply@quickcredit.com>';
    const subject = 'Loan Repayment Transaction Notification';
    const text = `Hello ${firstName}, \n \nYou have paid in ${paidAmount} as your normal monthly installment payment. \n \nYour Balance is ${loanBalance}.\n \nThank you. \n \nQuick Credit Team`;
    emailUtils(emailFrom, email, subject, text);
  }

  static response(rows) {
    const response = {
      id: rows[0].id,
      loanId: rows[0].loan_id,
      createdOn: rows[0].created_on,
      amount: rows[0].amount,
      monthlyInstallment: rows[0].monthly_installment,
      paidAmount: rows[0].paid_amount,
      balance: rows[0].balance,
    };
    return response;
  }

  static async postRepayment(queryString, values, next) {
    let result = '';
    try {
      const { rows } = await query(queryString, values);
      result = rows;
    } catch (error) {
      next(error);
    }
    return result;
  }
}
