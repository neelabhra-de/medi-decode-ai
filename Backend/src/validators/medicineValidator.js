const { body } = require("express-validator");

const medicineScanValidator = [
  body("medicineName").optional().isString(),
  body("ocrText").optional().isString(),
];

module.exports = { medicineScanValidator };
