import express from 'express';
import validator from '../middleware/validator';
import singleValidator from '../middleware/singleValidator';
import signInDetails from '../validation/signInDetails';
import signUpDetails from '../validation/signUpDetails';
import emailDetails from '../validation/emailDetails';
import verifyDetails from '../validation/verifyDetails';
import userController from '../controllers/usersController';
import authentication from '../middleware/authentication';
import jwtTokenUtils from '../helpers/jwtTokenUtils';
import resetValidator from '../middleware/resetValidator';
import resetDetails from '../validation/resetDetails';
import reset from '../middleware/resetPassword';

const { verifyToken } = jwtTokenUtils;
const {
  isUserExist,
  checkIsAccountVerified,
  isAdmin,
  notAUser,
} = authentication;
const { resetPassword, verifyResetToken } = reset;

const router = express.Router();

router.post('/auth/signup',
  validator(signUpDetails),
  isUserExist,
  userController.signUp);

router.post('/auth/signin',
  validator(signInDetails),
  notAUser,
  userController.signIn);

router.patch('/users/:email/verify',
  verifyToken,
  isAdmin,
  singleValidator(emailDetails),
  notAUser,
  checkIsAccountVerified,
  validator(verifyDetails),
  userController.verifyUser);

router.post('/users/:email/reset_password',
  verifyResetToken,
  singleValidator(emailDetails),
  notAUser,
  resetValidator(resetDetails),
  resetPassword,
  userController.resetPassword);

export default router;
