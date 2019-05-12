import Joi from '@hapi/joi';

const singleValidator = schema => async (req, res, next) => {
  try {
    const result = await Joi.validate(req.params, schema, {
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
