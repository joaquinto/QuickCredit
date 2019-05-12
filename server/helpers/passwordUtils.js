import bcrypt from 'bcryptjs';

export default class PasswordUtils {
  static hashPassword(userPassword) {
    return bcrypt.hash(userPassword, 10);
  }

  static comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}
