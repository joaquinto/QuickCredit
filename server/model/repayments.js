const repaymentQueries = {
  getRepaymentsByLoanId: 'SELECT * FROM repayments WHERE loan_id = $1',

  postRepayments: `INSERT INTO repayments(loan_id, created_on, amount,
    monthly_installment, paid_amount, balance) VALUES($1, $2, $3, $4,
      $5, $6) RETURNING *`,

  getRepayments: 'SELECT * FROM repayments',
};

export default repaymentQueries;

//   static getRepaymentsById(repayments, id) {
//     return repayments.filter(repayment => repayment.id === id);
//   }
// }
