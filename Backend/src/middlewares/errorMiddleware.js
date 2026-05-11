function notFound(req, res, next) {
  return res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}`, data: null });
}

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  return res.status(status).json({ success: false, message: err.message || "Internal server error", data: null });
}

module.exports = { notFound, errorHandler };
