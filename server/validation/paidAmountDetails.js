import Joi from '@hapi/joi';

const passwordDetails = Joi.object().keys({
  paid_amount: Joi.number().min(2).required(),
});

export default passwordDetails;
