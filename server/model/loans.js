const loanQueries = {
  createLoan: `INSERT INTO 
  loans(user_id, first_name, last_name, email, 
    created_on, status, tenor, amount, interest, 
    payment_installment, balance) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
    RETURNING *`,

  getLoanByUserId: 'SELECT * FROM loans WHERE user_id = $1',

  getLoanById: 'SELECT * FROM loans WHERE id = $1',

  getAllLoans: 'SELECT * FROM loans',

  getConditionalLoans: 'SELECT * FROM loans WHERE status = $1 AND repaid = $2',

  approveLoan: 'UPDATE loans SET status = $1 WHERE id = $2 RETURNING *',

};

export default loanQueries;

//   static getNewBalance(loans, id, balance) {
//     const newLoan = objectUtils.loanManipulation(loans, id, balance);
//     return newLoan;
//   }
// }
