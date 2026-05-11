const { body, param } = require("express-validator");

const reportUploadValidator = [
  body("extractedText").optional().isString(),
];

const idParamValidator = [param("id").isMongoId().withMessage("Invalid id")];

module.exports = { reportUploadValidator, idParamValidator };
