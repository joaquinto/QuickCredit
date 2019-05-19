const createTable = {
  userTable: `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(35) NOT NULL,
    last_name VARCHAR(35) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    status VARCHAR(15) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false
  )`,
  loanTable: `CREATE TABLE IF NOT EXISTS loans(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    first_name VARCHAR(35) NOT NULL,
    last_name VARCHAR(35) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_on TIMESTAMP NOT NULL,
    status VARCHAR(35) NOT NULL,
    repaid BOOLEAN NOT NULL DEFAULT false,
    tenor INTEGER NOT NULL,
    amount NUMERIC(15, 2) NOT NULL,
    interest NUMERIC(15, 2) NOT NULL,
    payment_installment NUMERIC(15, 2) NOT NULL,
    balance NUMERIC(15, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`,
  repaymentTable: `CREATE TABLE IF NOT EXISTS repayments(
    id SERIAL,
    loan_id INTEGER NOT NULL,
    created_on TIMESTAMP NOT NULL,
    amount NUMERIC(15, 2) NOT NULL,
    monthly_installment NUMERIC(15, 2) NOT NULL,
    paid_amount NUMERIC(15, 2) NOT NULL,
    balance NUMERIC(15, 2) NOT NULL,
    FOREIGN KEY (loan_id) REFERENCES loans (id)
  )`,
};

const dropTable = {
  dropUserTable: 'DROP TABLE IF EXISTS users CASCADE',
  dropLoanTable: 'DROP TABLE IF EXISTS loans CASCADE',
  dropRepaymentsTable: 'DROP TABLE IF EXISTS repayments CASCADE',
};

const hashedPassword = '$2a$10$7prDMxmaa232jRPZm2ZdFeQK4xa.xaFTVPk8GLj1aznpONJ7CKF6G';

const seedData = {
  userTable: `INSERT INTO 
  users(first_name, last_name, email, password, address, status, is_admin) 
    VALUES('Granda', 'Lex', 'johnlex@gmail.com', '${hashedPassword}', 'no 3, lewis street, lagos island', 'verified', true),
    ('John', 'Gabriel', 'johngabriel@gmail.com', '${hashedPassword}', 'no 3, lewis street, lagos island', 'verified', false),
    ('John', 'Snow', 'johnsnow@gmail.com','${hashedPassword}', 'no 3, lewis street, lagos island', 'unverified', false)`,
};

export {
  createTable,
  dropTable,
  seedData,
};
