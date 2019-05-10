import repaymentsModule from '../module/repaymentsModule';

export default {
  createRepayment: (req, res) => {
    repaymentsModule.createRepayment(req)
      .then((data) => {
        res.status(201).json({ status: 201, data });
      }).catch(error => res.status(500).json({ status: 500, error: error.message }));
  },

  getRepaymentsByLoanId: (req, res) => {
    repaymentsModule.getRepaymentByLoanId(req)
      .then((data) => {
        res.status(200).json({ status: 200, data });
      }).catch(error => res.status(500).json({ status: 500, error: error.message }));
  },

  getAllRepayments: (req, res) => {
    repaymentsModule.getRepayments()
      .then((data) => {
        res.status(200).json({ status: 200, data });
      }).catch(error => res.status(500).json({ status: 500, error: error.message }));
  },
};
