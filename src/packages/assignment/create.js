const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const moment = require("moment");
const { SUBMISSION_FILE_DIR } = require("../../../config/storage");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const { title, description, deadline } = req.body;

	const assignment = await models.assignment.create({
		title: title,
		description: description,
		mentor: req.user.id,
		deadline: moment(deadline).format("YYYY-MM-DD HH:mm:ss")
	});

	return res.status(StatusCodes.CREATED).json({
		message: "Assignment created",
		assignment
	});
});
