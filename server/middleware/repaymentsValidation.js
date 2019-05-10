import Joi from '@hapi/joi';

const repaymentValidation = (req, res, next) => {
  const paidAmount = Joi.number().min(2).required();

  const { error } = Joi.validate(req.body.paid_amount, paidAmount);
  if (error !== null) {
    const { details: [{ message }] } = error;
    res.status(405).json({ status: 405, error: message });
  }
  next();
};

export default repaymentValidation;
