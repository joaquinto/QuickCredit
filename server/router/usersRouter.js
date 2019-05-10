import express from 'express';
import authenticate from '../middleware/authenticate';
import isAdmin from '../middleware/isAdmin';
import isUserExist from '../middleware/isUserExist';
import signUpValidation from '../middleware/signUpValidation';
import parameterValidation from '../middleware/emailParameter';
import notAUser from '../middleware/notAUser';
import isEmailExist from '../middleware/isEmailExist';
import verifyValidation from '../middleware/verifyValidation';
import signInValidation from '../middleware/signInValidation';
import passwordValidation from '../middleware/passwordValidation';
import userController from '../controllers/userController';


const router = express.Router();

router.post('/auth/signup',
  signUpValidation,
  isUserExist,
  userController.signUp);

router.post('/auth/signin',
  signInValidation,
  notAUser,
  userController.signIn);

router.get('/users',
  authenticate,
  isAdmin,
  userController.getUsers);

router.patch('/users/:email/verify',
  authenticate,
  isAdmin,
  parameterValidation,
  isEmailExist,
  verifyValidation,
  userController.verifyUser);

router.delete('/users/:email',
  authenticate,
  isAdmin,
  parameterValidation,
  isEmailExist,
  userController.deleteUser);

router.post('/reset-password',
  parameterValidation,
  isEmailExist,
  userController.sendResetPasswordLink);

router.get('/users/:email/:token/reset-password',
  authenticate,
  parameterValidation,
  isEmailExist,
  userController.resetPasswordView);

router.patch('/users/:email/:token/reset-password',
  authenticate,
  parameterValidation,
  isEmailExist,
  passwordValidation,
  userController.resetUserPassword);

export default router;
