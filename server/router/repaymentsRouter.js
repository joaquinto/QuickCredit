import express from 'express';
import authenticate from '../middleware/authenticate';
import isAdmin from '../middleware/isAdmin';
import isAccountVerified from '../middleware/isAccountVerified';
import repaymentsController from '../controllers/repaymentsController';
import loanParameter from '../middleware/loanParameter';
import repaymentValidation from '../middleware/repaymentsValidation';
import checkPaidAmount from '../middleware/checkPaidAmount';
import isOwnerOrAdmin from '../middleware/isOwnerOrAdmin';
import isLoanExist from '../middleware/isLoanExist';

const router = express.Router();

router.post('/loans/:id/repayment',
  authenticate,
  isAccountVerified,
  isAdmin,
  loanParameter,
  isLoanExist,
  repaymentValidation,
  checkPaidAmount,
  repaymentsController.createRepayment);

router.get('/loans/:id/repayments',
  authenticate,
  isAccountVerified,
  loanParameter,
  isLoanExist,
  isOwnerOrAdmin,
  repaymentsController.getRepaymentsByLoanId);

router.get('/repayments',
  authenticate,
  isAdmin,
  isAccountVerified,
  repaymentsController.getAllRepayments);

export default router;
