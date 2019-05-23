import express from 'express';
import validator from '../middleware/validator';
import loanIdDetails from '../validation/loanIdDetails';
import singleValidator from '../middleware/singleValidator';
import paidAmountDetails from '../validation/paidAmountDetails';
import repaymentsController from '../controllers/repaymentsController';
import jwtTokenUtils from '../helpers/jwtTokenUtils';
import authentication from '../middleware/authentication';

const { verifyToken } = jwtTokenUtils;
const {
  isAccountVerified,
  checkIsLoanRepaid,
  isAdmin, isOwnerOrAdmin, isLoanExist,
  checkPaidAmount,
} = authentication;

const router = express.Router();

router.post('/loans/:id/repayment',
  verifyToken,
  isAdmin,
  singleValidator(loanIdDetails),
  isAccountVerified,
  isLoanExist,
  checkIsLoanRepaid,
  validator(paidAmountDetails),
  checkPaidAmount,
  repaymentsController.createRepayment);

router.get('/loans/:id/repayments',
  verifyToken,
  singleValidator(loanIdDetails),
  isLoanExist,
  isOwnerOrAdmin,
  repaymentsController.getRepaymentsByLoanId);

router.get('/repayments',
  verifyToken,
  isAdmin,
  isAccountVerified,
  repaymentsController.getAllRepayments);

export default router;
