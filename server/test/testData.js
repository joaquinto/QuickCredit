const data = {
  signIn: {
    email: 'johnlex@gmail.com',
    password: 'john2019',
  },
  signInWithWrongPassword: {
    email: 'johnlex@gmail.com',
    password: 'king20125',
  },
  client: {
    email: 'johngabriel@gmail.com',
    password: 'john2019',
  },
  missingEmail: {
    password: 'king2012',
  },
  missingPassword: {
    email: 'johnlex@gmail.com',
  },
  invalidEmail: {
    email: 'bjbdbjndmn',
    password: 'john2019',
  },
  invalidPassword: {
    email: 'johnlex@gmail.com',
    password: 76544,
  },
  missingFirstname: {
    lastname: 'wick',
    email: 'johnwick@gmail.com',
    password: 'wick2019',
    address: 'No 255 wallstreet, new york',
  },
  missingLastname: {
    firstname: 'john',
    email: 'johnwick@gmail.com',
    password: 'wick2019',
    address: 'No 255 wallstreet, new york',
  },
  missingSignupEmail: {
    firstname: 'john',
    lastname: 'wick',
    password: 'wick2019',
    address: 'No 255 wallstreet, new york',
  },
  missingSignupPassword: {
    firstname: 'john',
    lastname: 'wick',
    email: 'johnwick@gmail.com',
    address: 'No 255 wallstreet, new york',
  },
  missingSignupAddress: {
    firstname: 'john',
    lastname: 'wick',
    email: 'johnwick@gmail.com',
    password: 'wick2019',
  },
  signUp: {
    firstname: 'john',
    lastname: 'wick',
    email: 'johnwick@gmail.com',
    password: 'wick2019',
    address: 'No 255 wallstreet, new york',
  },
  verify: {
    status: 'verified',
  },
  verifyError: {
    status: 'log',
  },
  loanMissingFirstname: {
    lastname: 'gabriel',
    email: 'johngabriel@gmail.com',
    tenor: 5,
    amount: 5000,
  },
  loanMissingLastname: {
    firstname: 'john',
    email: 'johngabriel@gmail.com',
    tenor: 5,
    amount: 5000,
  },
  loanMissingEmail: {
    firstname: 'john',
    lastname: 'gabriel',
    tenor: 5,
    amount: 5000,
  },
  loanMissingTenor: {
    amount: 5000,
  },
  loanMissingAmount: {
    tenor: 5,
  },
  loan: {
    tenor: 5,
    amount: 5000,
  },
  approve: {
    status: 'approved',
  },
  reject: {
    status: 'rejected',
  },
  paidAmount: {
    paid_amount: 1050,
  },
  paidAmountOne: {
    paid_amount: 900,
  },
  invalidResetEmail: {
    email: 'hdbdjvkhjn',
  },
  notResetEmail: {
    email: 'johnsnow5@gmail.com',
  },
  resetEmail: {
    email: 'johnsnow@gmail.com',
  },
  resetPassword: {
    password: 'jonny2019',
  },
};

export default data;
