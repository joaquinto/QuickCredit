import express from 'express';
import authenticate from '../middleware/authenticate';
import isAdmin from '../middleware/isAdmin';
import loansController from '../controllers/loansController';
import loanValidation from '../middleware/loanValidation';
import isAccountVerified from '../middleware/isAccountVerified';
import loanParameter from '../middleware/loanParameter';
import loanQuery from '../middleware/loanQuery';
import isOwnerOrAdmin from '../middleware/isOwnerOrAdmin';
import isLoanExist from '../middleware/isLoanExist';
import checkQuerystring from '../middleware/checkQueryString';
import isClient from '../middleware/isClient';


const router = express.Router();

router.post('/loans',
  authenticate,
  isClient,
  isAccountVerified,
  loanValidation,
  loansController.createLoan);

router.get('/loans',
  authenticate,
  isAdmin,
  loanQuery,
  checkQuerystring,
  loansController.getAllLoans);

router.get('/loans/:id',
  authenticate,
  loanParameter,
  isLoanExist,
  isOwnerOrAdmin,
  loansController.getLoanById);

router.patch('/loans/:id',
  authenticate,
  isAdmin,
  loanParameter,
  isLoanExist,
  loansController.approveLoan);

export default router;
