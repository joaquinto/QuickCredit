/* eslint-disable no-plusplus */
export default class Utilities {
  static idGenerator() {
    const char = '1234567890';
    const serialLength = 8;
    let serial = '';
    let randomNumber;
    for (let i = 0; i < serialLength; i++) {
      randomNumber = Math.floor(Math.random() * char.length);
      serial += char.substring(randomNumber, randomNumber + 1);
    }
    const unique = serial;
    return unique;
  }

  static paymentInstallment(amount, interest, tenor) {
    return (amount + interest) / tenor;
  }

  static interest(amount) {
    return amount * 0.05;
  }

  static balanceCalculator(loan, repayment) {
    return loan.toFixed(2) - repayment.toFixed(2);
  }
}
