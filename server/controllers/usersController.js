import userModule from '../module/usersModule';

export default class UserController {
  static signUp(req, res, next) {
    userModule.signUpUser(req, next)
      .then((data) => {
        res.status(201).json({ status: 201, data });
      }).catch(error => res.status(500).json({ status: 500, error: error.message }));
  }
}
