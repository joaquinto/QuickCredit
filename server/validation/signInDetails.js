import Joi from '@hapi/joi';

const signInDetails = Joi.object().keys({
  email: Joi.string().email({ mindomainSegments: 2 }).required(),
  password: Joi.string().min(6).required(),
});

export default signInDetails;
