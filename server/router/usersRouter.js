import express from 'express';
import validation from '../middleware/validator';
import userController from '../controllers/usersController';

const router = express.Router();

router.post('/auth/signup',
  validation.signUpValidation,
  userController.signUp);

export default router;
