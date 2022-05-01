const { validationResult } = require("express-validator");

/**
 * Error message formatter
 * @param error
 * @returns {null|*|string|any}
 */
const errorFormatter = error => error.msg;

/**
 * Validate form with the given rules and returns error response if form is invalid
 * @param rules
 * @param statusCode
 * @returns {*[]}
 */
module.exports = (rules, statusCode = 422) => {
	return [
		rules,
		(req, res, next) => {
			const errors = validationResult(req).formatWith(errorFormatter);

			if (!errors.isEmpty()) {
				res.status(statusCode).json(errors.mapped());
			} else {
				next();
			}
		}
	];
};
