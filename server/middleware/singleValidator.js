import Joi from '@hapi/joi';

const singleValidator = schema => async (req, res, next) => {
  const parameters = req.params || req.query;
  try {
    const result = await Joi.validate(parameters, schema, {
      abortEarly: false,
      allowUnknown: true,
    });
    req.params = result;
    next();
  } catch (error) {
    const errors = error.details.map(item => item.message);
    res.status(400).send({ status: 400, error: errors });
  }
};

export default singleValidator;
