const { body } = require("express-validator");

module.exports = [
	body("mark")
		.trim()
		.not()
		.isEmpty()
		.withMessage("Mark is required")
		.bail()
		.isNumeric()
		.withMessage("Mark should be a number"),
	body("remark")
		.if(body("remark").trim().not().isEmpty())
		.isString()
		.withMessage("Remark should be string")
];
