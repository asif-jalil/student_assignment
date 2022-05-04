const asyncHandler = require("express-async-handler");
const { STUDENT } = require("../../utils/roles.const");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	let submission;

	if (req.user.role === STUDENT) {
		submission = await models.submission.findAll({
			where: {
				submittedBy: req.user.id
			}
		});
	} else {
		submission = await models.submission.findAll();
	}

	return res.json(submission);
});
