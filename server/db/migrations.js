import db from './index';
import { createTable, dropTable } from './queries';

const { userTable, loanTable } = createTable;
const { dropUserTable, dropLoanTable } = dropTable;

const createTables = async () => {
  try {
    const user = await db.query(userTable);
    console.log(user);
    const loan = await db.query(loanTable);
    console.log(loan);
  } catch (error) {
    console.log(error);
  }
};

const dropTables = async () => {
  try {
    await db.query(dropUserTable);
    console.log('>>>>>> user table created successfully');
    await db.query(dropLoanTable);
    console.log('>>>>>> loan table created successfully');
  } catch (error) {
    console.log(error);
  }
};

export {
  createTables,
  dropTables,
};

require('make-runnable');
