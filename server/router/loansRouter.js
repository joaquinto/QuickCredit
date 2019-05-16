import express from 'express';
import validator from '../middleware/validator';
import tokenUtils from '../helpers/tokenUtils';
import authentication from '../middleware/authentication';
import loanDetails from '../validation/loanDetails';
import loanIdDetails from '../validation/loanIdDetails';
import singleValidator from '../middleware/singleValidator';
import loansController from '../controllers/loansController';
import queryValidator from '../middleware/queryValidator';

const { AuthenticateToken } = tokenUtils;
const {
  isClient, isAccountVerified,
  isAdmin, isOwnerOrAdmin, isLoanExist,
  // checkIsLoanApproved,
} = authentication;

const router = express.Router();

router.post('/loans',
  AuthenticateToken,
  isClient,
  isAccountVerified,
  // checkIsLoanApproved,
  validator(loanDetails),
  loansController.createLoan);

router.get('/loans',
  AuthenticateToken,
  isAdmin,
  queryValidator,
  loansController.getAllLoans);

router.get('/loans/:id',
  AuthenticateToken,
  singleValidator(loanIdDetails),
  isLoanExist,
  isOwnerOrAdmin,
  loansController.getLoanById);

router.patch('/loans/:id',
  AuthenticateToken,
  isAdmin,
  singleValidator(loanIdDetails),
  isLoanExist,
  loansController.approveLoan);

export default router;
