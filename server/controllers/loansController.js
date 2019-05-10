import loanModule from '../module/loansModule';

export default {
  createLoan: (req, res) => {
    loanModule.createLoan(req)
      .then((data) => {
        res.status(201).json({ status: 201, data });
      }).catch(error => res.status(500).json({ status: 500, error: error.message }));
  },

  getAllLoans: (req, res) => {
    const { status } = req.query;
    const { repaid } = req.query;
    if ((status !== undefined) && (repaid !== undefined)) {
      loanModule.getAllConditionalLoans(req)
        .then((data) => {
          if (data.length < 1) {
            res.status(400).json({ status: 400, error: 'No data to display' });
          }
          res.status(200).json({ status: 200, data });
        }).catch(error => res.status(500).json({ status: 500, error: error.message }));
    } else {
      loanModule.getAllLoans()
        .then((data) => {
          res.status(200).json({ status: 200, data });
        }).catch(error => res.status(500).json({ status: 500, error: error.message }));
    }
  },

  approveLoan: (req, res) => {
    loanModule.approveLoan(req)
      .then((data) => {
        res.status(200).json({ status: 200, data });
      }).catch(error => res.status(500).json({ status: 500, error: error.message }));
  },

  getLoanById: (req, res) => {
    loanModule.getLoanById(req)
      .then((data) => {
        res.status(200).json({ status: 200, data });
      }).catch(error => res.status(500).json({ status: 500, error: error.message }));
  },
};
