import express from 'express';
import validator from '../middleware/validator';
import authentication from '../middleware/authentication';
import loanDetails from '../validation/loanDetails';
import loanIdDetails from '../validation/loanIdDetails';
import singleValidator from '../middleware/singleValidator';
import loansController from '../controllers/loansController';
import queryValidator from '../middleware/queryValidator';
import jwtTokenUtils from '../helpers/jwtTokenUtils';
import approvedOrRejectDetails from '../validation/approvedOrRejectDetails';

const { verifyToken } = jwtTokenUtils;
const {
  isClient, isAccountVerified,
  isAdmin, isOwnerOrAdmin, isLoanExist,
  checkIsLoanApproved,
} = authentication;

const router = express.Router();

router.post('/loans',
  verifyToken,
  isClient,
  isAccountVerified,
  validator(loanDetails),
  loansController.createLoan);

router.get('/loans',
  verifyToken,
  isAdmin,
  queryValidator,
  loansController.getAllLoans);

router.get('/loans/:id',
  verifyToken,
  singleValidator(loanIdDetails),
  isLoanExist,
  isOwnerOrAdmin,
  loansController.getLoanById);

router.patch('/loans/:id',
  verifyToken,
  isAdmin,
  singleValidator(loanIdDetails),
  isLoanExist,
  checkIsLoanApproved,
  validator(approvedOrRejectDetails),
  loansController.approveLoan);

export default router;
