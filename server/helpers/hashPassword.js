import bcrypt from 'bcryptjs';

const hashPassword = userPassword => bcrypt.hash(userPassword, 10);

export default hashPassword;
