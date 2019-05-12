import express from 'express';
import validator from '../middleware/validator';
import tokenUtils from '../helpers/tokenUtils';
import authentication from '../middleware/authentication';
import loanDetails from '../validation/loanDetails';
import loanIdDetails from '../validation/loanIdDetails';
import singleValidator from '../middleware/singleValidator';
import loansController from '../controllers/loansController';
import queryValidator from '../middleware/queryValidator';


const router = express.Router();

router.post('/loans',
  tokenUtils.AuthenticateToken,
  authentication.isClient,
  authentication.isAccountVerified,
  validator(loanDetails),
  loansController.createLoan);

router.get('/loans',
  tokenUtils.AuthenticateToken,
  authentication.isAdmin,
  queryValidator,
  loansController.getAllLoans);

router.get('/loans/:id',
  tokenUtils.AuthenticateToken,
  singleValidator(loanIdDetails),
  authentication.isLoanExist,
  authentication.isOwnerOrAdmin,
  loansController.getLoanById);

router.patch('/loans/:id',
  tokenUtils.AuthenticateToken,
  authentication.isAdmin,
  singleValidator(loanIdDetails),
  authentication.isLoanExist,
  loansController.approveLoan);

export default router;
