import Joi from '@hapi/joi';

const loanIdDetails = Joi.object().keys({
  id: Joi.number().required(),
});

export default loanIdDetails;
