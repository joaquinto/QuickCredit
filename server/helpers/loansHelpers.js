/* eslint-disable no-param-reassign */
export default {
  getLoans: loans => loans,

  getLoanById: (loans, id) => loans.filter(loan => (loan.id === id)),

  editLoanStatusById: (loans, id, status) => {
    const newLoan = loans.filter(loan => (loan.id !== id));
    const [Loans] = loans.filter(loan => (loan.id === id));
    Loans.status = status;
    newLoan.push(Loans);
    loans = newLoan;
    return Loans;
  },

  getConditionalLoans: (loans, status, repaid) => {
    const newLoan = loans
      .filter(loan => ((loan.status === status) && (loan.repaid === JSON.parse(repaid))));
    return newLoan;
  },

  getNewBalance: (loans, id, balance) => {
    const newLoan = loans.filter(loan => (loan.id !== id));
    const [Loans] = loans.filter(loan => (loan.id === id));
    Loans.balance = balance;
    newLoan.push(Loans);
    loans = newLoan;
    return loans;
  },
};
