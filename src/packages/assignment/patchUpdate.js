const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const moment = require("moment");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const { assignmentId } = req.body;

	const assignment = await models.assignment.findByPk(assignmentId);

	if (!assignment)
		return res.status(StatusCodes.NOT_FOUND).json({
			message: "Assignment not found"
		});

	assignment.update({
		title: req.body.title || assignment.title,
		description: req.body.description || assignment.description,
		mentor: req.body.mentorId || assignment.mentor,
		deadline:
			moment(req.body.deadline).format("YYYY-MM-DD HH:mm:ss") ||
			assignment.deadline
	});

	return res.json({
		message: "Assignment updated",
		assignment
	});
});
