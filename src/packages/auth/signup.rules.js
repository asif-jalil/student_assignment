const { body } = require("express-validator");
const { MIN_PASSWORD_LENGTH } = require("../../../config/app");
const {
	minLengthMessage,
	maxLengthMessage,
	isUniqueUserEmail,
} = require("../../utils/validator");

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
		.withMessage(maxLengthMessage("Email address", 100))
		.bail()
		.custom(isUniqueUserEmail())
		.withMessage("This email address has already signed up"),
	body("password")
		.trim()
		.not()
		.isEmpty()
		.withMessage("Password is required")
		.bail()
		.isLength({ min: MIN_PASSWORD_LENGTH })
		.withMessage(minLengthMessage("Password", MIN_PASSWORD_LENGTH)),
	body("name")
		.trim()
		.not()
		.isEmpty()
		.withMessage("Name is required")
		.bail()
];
