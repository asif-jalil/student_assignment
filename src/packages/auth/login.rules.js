const { body } = require("express-validator");
const { maxLengthMessage } = require("../../utils/validator");

module.exports = [
	body("email")
		.trim()
		.not()
		.isEmpty()
		.withMessage("Email address is required")
		.bail()
		.isEmail()
		.withMessage("Email address is invalid")
		.bail()
		.isLength({ max: 100 })
		.withMessage(maxLengthMessage("Email address", 100)),
	body("password").trim().not().isEmpty().withMessage("Password is required")
];
