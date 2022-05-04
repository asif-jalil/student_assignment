const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");

const submissionNotFound = res => {
	return res.status(StatusCodes.BAD_REQUEST).json({
		message: "Submission not found"
	});
};

const isDoubleWay = res => {
	return res
		.status(StatusCodes.BAD_REQUEST)
		.json({ message: "You should provide URL or file. Both is not supported" });
};

const noSubmission = res => {
	return res.status(StatusCodes.BAD_REQUEST).json({
		message: "No file or link included"
	});
};

module.exports = asyncHandler(async (req, res) => {
	const { submissionId, link } = req.body;
	const { path } = req.file || { path: null };

	const submission = await models.submission.findByPk(submissionId);

	if (!submission) return submissionNotFound(res);

	if (link && path) return isDoubleWay(res);

	if (!link && !path) return noSubmission(res);

	if (link) {
		await submission.update({
			file: null,
			link: link
		});
	}

	if (path) {
		await submission.update({
			file: path,
			link: null
		});
	}

	return res.json({
		message: "Submission updated",
		submission: submission
	});
});
