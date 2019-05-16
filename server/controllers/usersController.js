import userModule from '../module/usersModule';

export default class UserController {
  static signUp(req, res, next) {
    userModule.signUpUser(req, next)
      .then((data) => {
        res.status(201).json({ status: 201, data, message: 'User created successfully' });
      });
  }

  static signIn(req, res) {
    userModule.signInUser(req)
      .then((data) => {
        if (data.error) {
          res.status(405).json(data);
        }
        res.status(200).json({ status: 200, data, message: 'User signed in successfully' });
      });
  }

  static getUsers(req, res) {
    userModule.getUsers()
      .then((data) => {
        res.status(200).json({ status: 200, data, message: 'The operation you performed was successful' });
      });
  }

  static verifyUser(req, res) {
    userModule.verifyUser(req)
      .then((data) => {
        res.status(200).json({ status: 200, data, message: 'User verified successfully' });
      });
  }

  static deleteUser(req, res) {
    userModule.deleteUser(req)
      .then((data) => {
        res.status(200).json({ status: 200, data, message: 'User deleted successfully' });
      });
  }

  static sendResetPasswordLink(req, res) {
    userModule.sendResetPasswordLink(req)
      .then((data) => {
        res.status(200).json({ status: 200, data: { token: data.token, email: data.email }, message: 'check your email for a password reset link' });
      });
  }

  static resetPasswordView(req, res) {
    res.status(200).json({ status: 200, data: 'This is the reset password view', message: 'This operation was successful' });
  }

  static resetUserPassword(req, res) {
    userModule.resetUserPassword(req)
      .then((data) => {
        res.status(200).json({ status: 200, data, message: 'Password reset successfully' });
      });
  }
}
