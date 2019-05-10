export default {
  getRepayments: repayments => repayments,

  getRepaymentsById: (repayments, id) => repayments
    .filter(repayment => repayment.id === id),

  getRepaymentsByLoanId: (repayments, loanId) => repayments
    .filter(repayment => repayment.loanId === loanId),
};
