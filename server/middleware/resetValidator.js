import Joi from '@hapi/joi';

const resetValidator = schema => async (req, res, next) => {
  if (req.body.password !== undefined) {
    try {
      const result = await Joi.validate(req.body, schema, {
        abortEarly: false,
        allowUnknown: true,
      });
      req.body = result;
    } catch (error) {
      const errors = error.details.map(item => item.message);
      res.status(400).send({ status: 400, error: errors });
    }
  }
  next();
};

export default resetValidator;
