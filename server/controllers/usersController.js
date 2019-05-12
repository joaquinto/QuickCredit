import userModule from '../module/usersModule';

export default class UserController {
  static signUp(req, res, next) {
    userModule.signUpUser(req, next)
      .then((data) => {
        res.status(201).json({ status: 201, data });
      });
  }

  static signIn(req, res) {
    userModule.signInUser(req)
      .then((data) => {
        if (data.error) {
          res.status(405).json(data);
        }
        res.status(200).json({ status: 200, data });
      });
  }

  static getUsers(req, res) {
    userModule.getUsers()
      .then((data) => {
        res.status(200).json({ status: 200, data });
      });
  }

  static verifyUser(req, res) {
    userModule.verifyUser(req)
      .then((data) => {
        res.status(200).json({ status: 200, data });
      });
  }

  static deleteUser(req, res) {
    userModule.deleteUser(req)
      .then((data) => {
        res.status(200).json({ status: 200, data });
      }).catch(error => res.status(500).json({ status: 500, error: error.message }));
  }

  static sendResetPasswordLink(req, res) {
    userModule.sendResetPasswordLink(req)
      .then((data) => {
        res.status(200).json({ status: 200, data: { message: 'check your email for a password reset link', token: data.token, email: data.email } });
      }).catch(error => res.status(500).json({ status: 500, error: error.message }));
  }
}
