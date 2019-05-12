import Joi from '@hapi/joi';

const passwordDetails = Joi.object().keys({
  password: Joi.string().min(6).required(),
});

export default passwordDetails;
