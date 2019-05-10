import Joi from '@hapi/joi';

const passwordValidation = (req, res, next) => {
  const password = Joi.string().min(6).required();

  const { error } = Joi.validate(req.body.password, password);
  if (error !== null) {
    const { details: [{ message }] } = error;
    res.status(405).json({ status: 405, error: message });
  }
  next();
};

export default passwordValidation;
