import Joi from '@hapi/joi';

const loanValidation = (req, res, next) => {
  const schema = Joi.object().keys({
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    email: Joi.string().email({ mindomainSegments: 2 }).required(),
    tenor: Joi.number().min(1).max(12).required(),
    amount: Joi.number().required(),
  });

  const { error } = Joi.validate(req.body, schema);
  if (error !== null) {
    const { details: [{ message }] } = error;
    res.status(405).json({ status: 405, error: message });
  }
  next();
};

export default loanValidation;
