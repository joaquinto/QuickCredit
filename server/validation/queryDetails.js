import Joi from '@hapi/joi';

const queryDetails = Joi.object().keys({
  status: Joi.string().regex(/^approved$/).required(),
  repaid: Joi.boolean().required(),
});

export default queryDetails;
