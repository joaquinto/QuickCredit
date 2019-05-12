import express from 'express';
import validator from '../middleware/validator';
import singleValidator from '../middleware/singleValidator';
import signInDetails from '../validation/signInDetails';
import signUpDetails from '../validation/signUpDetails';
import emailDetails from '../validation/emailDetails';
import verifyDetails from '../validation/verifyDetails';
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

router.patch('/users/:email/verify',
  tokenUtils.AuthenticateToken,
  authentication.isAdmin,
  singleValidator(emailDetails),
  authentication.notAUser,
  validator(verifyDetails),
  userController.verifyUser);

router.delete('/users/:email',
  tokenUtils.AuthenticateToken,
  authentication.isAdmin,
  singleValidator(emailDetails),
  authentication.notAUser,
  userController.deleteUser);

export default router;
