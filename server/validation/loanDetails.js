import Joi from '@hapi/joi';

const loanDetails = Joi.object().keys({
  tenor: Joi.number().min(1).max(12).required(),
  amount: Joi.number().min(500).required(),
});

export default loanDetails;
