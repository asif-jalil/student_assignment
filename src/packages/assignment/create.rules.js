const { body } = require("express-validator");
const { isDateValid } = require("../../utils/validator");

module.exports = [
	body("title").trim().not().isEmpty().withMessage("Title is required"),
	body("deadline")
		.trim()
		.not()
		.isEmpty()
		.withMessage("Deadline is required")
		.bail()
		.custom(isDateValid)
		.withMessage("The deadline is invalid")
];
