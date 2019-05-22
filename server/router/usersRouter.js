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

const { verifyToken } = jwtTokenUtils;
const {
  isUserExist,
  checkIsAccountVerified,
  isAdmin,
  notAUser,
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

router.patch('/users/:email/verify',
  verifyToken,
  isAdmin,
  singleValidator(emailDetails),
  notAUser,
  checkIsAccountVerified,
  validator(verifyDetails),
  userController.verifyUser);

export default router;
