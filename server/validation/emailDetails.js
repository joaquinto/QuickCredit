import Joi from '@hapi/joi';

const emailDetails = Joi.object().keys({
  email: Joi.string().email({ mindomainSegments: 2 }).required(),
});

export default emailDetails;
