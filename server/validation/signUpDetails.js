import Joi from '@hapi/joi';

const signUpDetails = Joi.object().keys({
  firstname: Joi.string().regex(/^[A-Za-z]+$/).min(2).max(35)
    .required(),
  lastname: Joi.string().regex(/^[A-Za-z]+$/).min(2).max(35)
    .required(),
  email: Joi.string().email({ mindomainSegments: 2 }).required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().min(10).required(),
});

export default signUpDetails;
