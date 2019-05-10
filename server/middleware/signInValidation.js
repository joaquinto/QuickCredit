import Joi from '@hapi/joi';

const signInValidation = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email({ mindomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = Joi.validate(req.body, schema);
  if (error !== null) {
    const { details: [{ message }] } = error;
    res.status(405).json({ status: 405, error: message });
  }
  next();
};

export default signInValidation;
