const checkQueryString = (req, res, next) => {
  const { status } = req.query;
  const { repaid } = req.query;
  if ((status !== undefined) && (repaid !== undefined)) {
    if ((status !== 'approved') && (repaid !== false)) {
      if ((status !== 'approved') && (repaid !== true)) {
        res.status(404).json({ status: 404, error: 'Query not found ...' });
      }
      next();
    }
    next();
  } else {
    next();
  }
};

export default checkQueryString;
