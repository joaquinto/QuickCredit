import express from 'express';
import validator from '../middleware/validator';
import signInDetails from '../validation/signInDetails';
import signUpDetails from '../validation/signUpDetails';
import userController from '../controllers/usersController';
import authentication from '../middleware/authentication';

const router = express.Router();

router.post('/auth/signup',
  validator(signUpDetails),
  authentication.isUserExist,
  userController.signUp);

router.post('/auth/signin',
  validator(signInDetails),
  authentication.notAUser,
  userController.signIn);

export default router;
