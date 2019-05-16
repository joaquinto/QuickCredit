import express from 'express';
import validator from '../middleware/validator';
import tokenUtils from '../helpers/tokenUtils';
import authentication from '../middleware/authentication';
import loanIdDetails from '../validation/loanIdDetails';
import singleValidator from '../middleware/singleValidator';
import paidAmountDetails from '../validation/paidAmountDetails';
import repaymentsController from '../controllers/repaymentsController';

const { AuthenticateToken } = tokenUtils;
const {
  isAccountVerified,
  isAdmin, isOwnerOrAdmin, isLoanExist,
  checkPaidAmount,
} = authentication;

const router = express.Router();

router.post('/loans/:id/repayment',
  AuthenticateToken,
  isAdmin,
  singleValidator(loanIdDetails),
  isLoanExist,
  validator(paidAmountDetails),
  checkPaidAmount,
  repaymentsController.createRepayment);

router.get('/loans/:id/repayments',
  AuthenticateToken,
  singleValidator(loanIdDetails),
  isLoanExist,
  isOwnerOrAdmin,
  repaymentsController.getRepaymentsByLoanId);

router.get('/repayments',
  AuthenticateToken,
  isAdmin,
  isAccountVerified,
  repaymentsController.getAllRepayments);

export default router;
