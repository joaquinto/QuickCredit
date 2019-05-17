import express from 'express';
import validator from '../middleware/validator';
import singleValidator from '../middleware/singleValidator';
import signInDetails from '../validation/signInDetails';
import signUpDetails from '../validation/signUpDetails';
import emailDetails from '../validation/emailDetails';
import passwordDetails from '../validation/passwordDetails';
import verifyDetails from '../validation/verifyDetails';
import userController from '../controllers/usersController';
import authentication from '../middleware/authentication';
import jwtTokenUtils from '../helpers/jwtTokenUtils';

const { verifyToken } = jwtTokenUtils;
const {
  isUserExist,
  checkIsAccountVerified,
  isAdmin, notAUser,
} = authentication;

const router = express.Router();

router.post('/auth/signup',
  validator(signUpDetails),
  isUserExist,
  userController.signUp);

router.post('/auth/signin',
  validator(signInDetails),
  notAUser,
  userController.signIn);

router.get('/users',
  verifyToken,
  isAdmin,
  userController.getUsers);

router.patch('/users/:email/verify',
  verifyToken,
  isAdmin,
  singleValidator(emailDetails),
  notAUser,
  checkIsAccountVerified,
  validator(verifyDetails),
  userController.verifyUser);

router.delete('/users/:email',
  verifyToken,
  isAdmin,
  singleValidator(emailDetails),
  authentication.notAUser,
  userController.deleteUser);

router.post('/reset-password',
  validator(emailDetails),
  notAUser,
  userController.sendResetPasswordLink);

router.get('/users/:email/:token/reset-password',
  verifyToken,
  singleValidator(emailDetails),
  notAUser,
  userController.resetPasswordView);

router.patch('/users/:email/:token/reset-password',
  verifyToken,
  singleValidator(emailDetails),
  notAUser,
  validator(passwordDetails),
  userController.resetUserPassword);

export default router;
