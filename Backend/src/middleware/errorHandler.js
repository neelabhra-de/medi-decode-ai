function errorHandler(err, req, res, next) {
  if (err) {
    return res.status(500).json({ message: err.message || "Server error" });
  }
  return next();
}

module.exports = errorHandler;
