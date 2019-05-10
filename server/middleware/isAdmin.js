const isAdmin = (req, res, next) => {
  if (!req.decoded.admin) {
    res.status(401).json({ status: 401, error: 'Access Denied ... Unauthorized Access' });
  }
  next();
};

export default isAdmin;
