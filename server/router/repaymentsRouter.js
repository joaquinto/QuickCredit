import express from 'express';
import validator from '../middleware/validator';
import tokenUtils from '../helpers/tokenUtils';
import authentication from '../middleware/authentication';
import loanIdDetails from '../validation/loanIdDetails';
import singleValidator from '../middleware/singleValidator';
import paidAmountDetails from '../validation/paidAmountDetails';
import repaymentsController from '../controllers/repaymentsController';

const router = express.Router();

router.post('/loans/:id/repayment',
  tokenUtils.AuthenticateToken,
  authentication.isAdmin,
  singleValidator(loanIdDetails),
  authentication.isLoanExist,
  validator(paidAmountDetails),
  authentication.checkPaidAmount,
  repaymentsController.createRepayment);

export default router;
