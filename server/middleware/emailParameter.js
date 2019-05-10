import Joi from '@hapi/joi';

const emailParameter = (req, res, next) => {
  const email = Joi.string().email({ mindomainSegments: 2 }).required();
  const value = req.params.email || req.body.email;
  const { error } = Joi.validate(value, email);
  if (error !== null) {
    const { details: [{ message }] } = error;
    res.status(405).json({ status: 405, error: message });
  }
  next();
};

export default emailParameter;
