const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const models = require("../models");
const moment = require("moment");

const isValidated = rules => {
	return [
		rules,
		async (req, res, next) => {
			const errors = validationResult(req).formatWith(error => error.msg);

			if (!errors.isEmpty()) {
				return res
					.status(StatusCodes.UNPROCESSABLE_ENTITY)
					.json(errors.mapped());
			}

			next();
		}
	];
};

const isUniqueUserEmail =
	(includingCurrentUser = true) =>
	async (email, { req }) => {
		const user = await models.user.findOne({
			attributes: ["id"],
			where: {
				...(!includingCurrentUser && {
					id: {
						[Op.ne]: req.user.id
					}
				}),
				email
			},
			raw: true
		});

		if (user) throw new Error("This email address is already in use");
		return true;
	};

const isDateValid = date => {
	if (moment(date) < moment()) {
		throw new Error("Input date is invalid");
	}

	return true;
};

const minLengthMessage = (label, min) => {
	return `${label} must be minimum ${min} characters long`;
};

const maxLengthMessage = (label, max) => {
	return `${label} must be maximum ${max} characters long`;
};

module.exports = {
	isValidated,
	isDateValid,
	minLengthMessage,
	maxLengthMessage,
	isUniqueUserEmail
};
