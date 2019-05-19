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

};

export default loanQueries;

// export default class Loans {
//   constructor(id, firstname, lastname, email, createdOn, status, repaid,
//     tenor, amount, paymentInstallment, balance, interest) {
//     this.id = id;
//     this.firstname = firstname;
//     this.lastname = lastname;
//     this.email = email;
//     this.createdOn = createdOn;
//     this.status = status;
//     this.repaid = repaid;
//     this.tenor = tenor;
//     this.amount = amount;
//     this.paymentInstallment = paymentInstallment;
//     this.balance = balance;
//     this.interest = interest;
//   }

//   static getLoans(loans) {
//     return loans;
//   }

//   static getConditionalLoans(loans, status, repaid) {
//     const newLoan = loans
//       .filter(loan => ((loan.status === status) && (loan.repaid === JSON.parse(repaid))));
//     return newLoan;
//   }

//   static getLoanByEmail(loans, email) {
//     const newLoan = loans.filter(loan => (loan.email === email));
//     return newLoan;
//   }

//   static getLoanById(loans, id) {
//     return loans.filter(loan => (loan.id === id));
//   }

//   static editLoanStatusById(loans, id, status) {
//     const newLoan = objectUtils.loanManipulation(loans, id, status);
//     return newLoan;
//   }

//   static getNewBalance(loans, id, balance) {
//     const newLoan = objectUtils.loanManipulation(loans, id, balance);
//     return newLoan;
//   }
// }
