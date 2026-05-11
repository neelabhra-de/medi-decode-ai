const { body } = require("express-validator");

const reportChatValidator = [
  body("reportId").isMongoId().withMessage("reportId required"),
  body("question").isString().notEmpty().withMessage("question required"),
];

module.exports = { reportChatValidator };
