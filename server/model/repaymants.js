export default class Repayments {
  constructor(id, createdOn, loanId, amount, monthlyInstallment, paidAmount, balance) {
    this.id = id;
    this.createdOn = createdOn;
    this.loanId = loanId;
    this.amount = amount;
    this.monthlyInstallment = monthlyInstallment;
    this.paidAmount = paidAmount;
    this.balance = balance;
  }
}
