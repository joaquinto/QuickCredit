import Joi from '@hapi/joi';

const loanDetails = Joi.object().keys({
  firstname: Joi.string().min(2).required(),
  lastname: Joi.string().min(2).required(),
  email: Joi.string().email({ mindomainSegments: 2 }).required(),
  tenor: Joi.number().min(1).max(12).required(),
  amount: Joi.number().min(500).required(),
});

export default loanDetails;
