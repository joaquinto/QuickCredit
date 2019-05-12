import express from 'express';
import validator from '../middleware/validator';
import signInDetails from '../validation/signInDetails';
import signUpDetails from '../validation/signUpDetails';
import userController from '../controllers/usersController';
import authentication from '../middleware/authentication';
import tokenUtils from '../helpers/tokenUtils';

const router = express.Router();

router.post('/auth/signup',
  validator(signUpDetails),
  authentication.isUserExist,
  userController.signUp);

router.post('/auth/signin',
  validator(signInDetails),
  authentication.notAUser,
  userController.signIn);

router.get('/users',
  tokenUtils.AuthenticateToken,
  authentication.isAdmin,
  userController.getUsers);

export default router;
