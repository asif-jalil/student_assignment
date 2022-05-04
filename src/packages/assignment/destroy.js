const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const { assignmentId } = req.params;

	const assignment = await models.assignment.findOne({
		where: {
			id: assignmentId
		}
	});

	if (!assignment)
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: "Assignment not found."
		});

	await assignment.destroy();

	return res.json({
		message: "Deleted successfully",
		assignmentId
	});
});
