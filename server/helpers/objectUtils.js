/* eslint-disable no-param-reassign */
export default class ObjectUtils {
  static userManipulation(users, email, manipulator) {
    const newUsers = users.filter(user => (user.email !== email));
    const newUser = users.filter(user => (user.email === email));
    if (manipulator === 'verified') {
      newUser[0].status = manipulator;
    } else {
      newUser[0].password = manipulator;
    }
    newUsers.push(newUser);
    users = newUser;
    return newUser;
  }

  static loanManipulation(loans, id, manipulator) {
    const newLoans = loans.filter(loan => (loan.id !== id));
    const newLoan = loans.filter(loan => (loan.id === id));
    if ((manipulator === 'approved') || (manipulator === 'rejected')) {
      newLoan[0].status = manipulator;
    } else if (manipulator === 'balance') {
      newLoan[0].balance = manipulator;
    }
    newLoans.push(newLoan);
    loans = newLoans;
    return newLoan;
  }
}
