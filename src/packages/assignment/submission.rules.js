const { body } = require("express-validator");

module.exports = [
	body("link")
		.if(body("link").trim().not().isEmpty())
		.isURL()
		.withMessage("Invalid link")
];
