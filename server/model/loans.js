export default class Loans {
  constructor(id, firstname, lastname, email, createdOn, status, repaid,
    tenor, amount, paymentInstallment, balance, interest) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.createdOn = createdOn;
    this.status = status;
    this.repaid = repaid;
    this.tenor = tenor;
    this.amount = amount;
    this.paymentInstallment = paymentInstallment;
    this.balance = balance;
    this.interest = interest;
  }

  static getLoans(loans) {
    return loans;
  }

  static getConditionalLoans(loans, status, repaid) {
    const newLoan = loans
      .filter(loan => ((loan.status === status) && (loan.repaid === JSON.parse(repaid))));
    return newLoan;
  }
}