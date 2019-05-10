import Joi from '@hapi/joi';

const verifyValidation = (req, res, next) => {
  const verify = Joi.string().regex(/^verified$/).required();

  const { error } = Joi.validate(req.body.status, verify);
  if (error !== null) {
    const { details: [{ message }] } = error;
    res.status(405).json({ status: 405, error: message });
  }
  next();
};

export default verifyValidation;
