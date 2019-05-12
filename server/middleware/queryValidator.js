import Joi from '@hapi/joi';

const queryValidator = (req, res, next) => {
  const { status } = req.query;
  const { repaid } = req.query;
  if ((status !== undefined) && (repaid !== undefined)) {
    const schema = Joi.object().keys({
      status: Joi.string().regex(/^approved$/).required(),
      repaid: Joi.boolean().required(),
    });

    const { error } = Joi.validate(req.query, schema);
    if (error !== null) {
      const { details: [{ message }] } = error;
      res.status(400).json({ status: 400, error: message });
    }
    next();
  } else {
    next();
  }
};

export default queryValidator;
