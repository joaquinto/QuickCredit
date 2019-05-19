import db from './index';
import { createTable, dropTable } from './queries';

const { userTable, loanTable, repaymentTable } = createTable;
const { dropUserTable, dropLoanTable, dropRepaymentsTable } = dropTable;

const createTables = async () => {
  try {
    await db.query(userTable);
    await db.query(loanTable);
    await db.query(repaymentTable);
  } catch (error) {
    console.log(error);
  }
};

const dropTables = async () => {
  try {
    await db.query(dropUserTable);
    await db.query(dropLoanTable);
    await db.query(dropRepaymentsTable);
  } catch (error) {
    console.log(error);
  }
};

export {
  createTables,
  dropTables,
};

require('make-runnable');
