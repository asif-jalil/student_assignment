const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const { submissionId } = req.params;

	const submission = await models.submission.findOne({
		where: {
			id: submissionId
		}
	});

	if (!submission)
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: "Submission not found."
		});

	await submission.destroy();

	return res.json({
		message: "Deleted successfully",
		submissionId
	});
});
