import utilities from '../helpers/utilities';
import loans from '../model/loans';
import db from '../db/index';

const { query } = db;
const {
  createLoanQuery, getAllLoans, getLoanById,
  getConditionalLoans, approveLoan,
} = loans;

export default class LoanController {
  static async createLoan(req, res, next) {
    const { firstname, lastname } = req.body;
    const email = req.body.email.toLowerCase();
    const createdOn = new Date();
    const status = 'pending';
    let { tenor, amount } = req.body;
    tenor = Number(tenor);
    amount = Number(amount);
    const interest = utilities.interest(amount);
    const paymentInstallment = utilities.paymentInstallment(amount, interest, tenor);
    amount += interest;
    const balance = amount;
    const values = [req.decoded.id, firstname, lastname, email,
      createdOn, status, tenor, amount, interest, paymentInstallment,
      balance];
    try {
      const { rows } = await query(createLoanQuery, values);
      const response = {
        id: rows[0].id,
        firstname: rows[0].first_name,
        lastname: rows[0].last_name,
        email: rows[0].email,
        createdOn: rows[0].created_on,
        status: rows[0].status,
        repaid: rows[0].repaid,
        tenor: rows[0].tenor,
        amount: rows[0].amount,
        paymentInstallment: rows[0].payment_installment,
        balance: rows[0].balance,
        interest: rows[0].interest,
      };
      res.status(201).json({ status: 201, message: 'Loan created successfully', data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getAllLoans(req, res, next) {
    const { status, repaid } = req.query;
    try {
      if ((status !== undefined) && (repaid !== undefined)) {
        const { rows } = await query(getConditionalLoans, [status, repaid]);
        if (rows.length < 1) {
          res.status(404).json({ status: 404, error: 'No loan to display' });
        }
        res.status(200).json({ status: 200, message: 'conditional loans was retrieved successfully', data: rows });
      } else {
        const { rows } = await query(getAllLoans);
        res.status(200).json({ status: 200, message: 'retrieved all loans successfully', data: rows });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getLoanById(req, res, next) {
    try {
      const { rows } = await query(getLoanById, [req.params.id]);
      res.status(200).json({ status: 200, message: 'retrieved loan successfully', data: rows[0] });
    } catch (error) {
      next(error);
    }
  }

  static async approveLoan(req, res, next) {
    const { status } = req.body;
    try {
      const { rows } = await query(approveLoan, [status, req.params.id]);
      res.status(200).json({ status: 200, message: 'Loan was approved successfully', data: rows[0] });
    } catch (error) {
      next(error);
    }
  }
}
