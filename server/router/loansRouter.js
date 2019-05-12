import express from 'express';
import validator from '../middleware/validator';
import tokenUtils from '../helpers/tokenUtils';
import authentication from '../middleware/authentication';
import loanDetails from '../validation/loanDetails';
import loansController from '../controllers/loansController';


const router = express.Router();

router.post('/loans',
  tokenUtils.AuthenticateToken,
  authentication.isClient,
  authentication.isAccountVerified,
  validator(loanDetails),
  loansController.createLoan);

export default router;
