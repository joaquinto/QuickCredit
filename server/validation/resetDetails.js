import Joi from '@hapi/joi';

const resetDetails = Joi.object().keys({
  password: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),
});

export default resetDetails;
