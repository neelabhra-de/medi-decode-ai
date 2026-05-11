const { body } = require("express-validator");

const updateProfileValidator = [
  body("name").optional().isString().isLength({ min: 2 }),
  body("avatar").optional().isString(),
];

module.exports = { updateProfileValidator };
