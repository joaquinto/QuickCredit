const repaymentQueries = {
  getRepaymentsByLoanId: 'SELECT * FROM repayments WHERE loan_id = $1',

  postRepayments: `INSERT INTO repayments(loan_id, created_on, amount,
    monthly_installment, paid_amount, balance) VALUES($1, $2, $3, $4,
      $5, $6) RETURNING *`,
};

export default repaymentQueries;

// export default class Repayments {
//   constructor(id, createdOn, loanId, amount, monthlyInstallment, paidAmount, balance) {
//     this.id = id;
//     this.createdOn = createdOn;
//     this.loanId = loanId;
//     this.amount = amount;
//     this.monthlyInstallment = monthlyInstallment;
//     this.paidAmount = paidAmount;
//     this.balance = balance;
//   }

//   static getRepaymentsByLoanId(repayments, loanId) {
//     return repayments.filter(repayment => repayment.loanId === loanId);
//   }

//   static getRepayments(repayments) {
//     return repayments;
//   }

//   static getRepaymentsById(repayments, id) {
//     return repayments.filter(repayment => repayment.id === id);
//   }
// }
