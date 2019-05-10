import Joi from '@hapi/joi';

const loanParameter = (req, res, next) => {
  const id = Joi.number().required();

  const { error } = Joi.validate(req.params.id, id);
  if (error !== null) {
    const { details: [{ message }] } = error;
    res.status(405).json({ status: 405, error: message });
  }
  next();
};

export default loanParameter;
