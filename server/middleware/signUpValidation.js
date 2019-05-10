import Joi from '@hapi/joi';

const signUpValidation = (req, res, next) => {
  const schema = Joi.object().keys({
    firstname: Joi.string().regex(/^[A-Za-z]+$/).min(2).max(35)
      .required(),
    lastname: Joi.string().regex(/^[A-Za-z]+$/).min(2).max(35)
      .required(),
    email: Joi.string().email({ mindomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
    address: Joi.string().min(10).required(),
  });

  const { error } = Joi.validate(req.body, schema);
  if (error !== null) {
    const { details: [{ message }] } = error;
    res.status(405).json({ status: 405, error: message });
  }
  next();
};

export default signUpValidation;
