const multer = require("multer");

const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  if (allowed.includes(file.mimetype)) return cb(null, true);
  return cb(new Error("Unsupported file type. Only JPG, PNG, WEBP, PDF allowed."));
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = upload;
