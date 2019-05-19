import db from './index';
import { seedData } from './queries';

const { userTable } = seedData;
const seedDatas = async () => {
  try {
    await db.query(userTable);
    console.log('>>>> user datas has been seeded');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  seedDatas,
};

require('make-runnable');
