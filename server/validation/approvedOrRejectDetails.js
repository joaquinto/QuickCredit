import Joi from '@hapi/joi';

const approveOrReject = Joi.object().keys({
  status: Joi.string().regex(/^(approved|rejected)$/).required(),
});

export default approveOrReject;
