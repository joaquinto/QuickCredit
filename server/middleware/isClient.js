const isClient = (req, res, next) => {
  if (req.decoded.admin) {
    res.status(405).json({ status: 405, error: 'Access Denied ...' });
  }
  next();
};

export default isClient;
