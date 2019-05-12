import Joi from '@hapi/joi';

const verifyDetails = Joi.object().keys({
  status: Joi.string().regex(/^verified$/).required(),
});

export default verifyDetails;
