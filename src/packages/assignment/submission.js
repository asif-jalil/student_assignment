const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");

const assignmentNotFound = res => {
	return res.status(StatusCodes.BAD_REQUEST).json({
		message: "Your requested assignment is not found"
	});
};

const duplicatedSubmission = res => {
	return res.status(StatusCodes.BAD_REQUEST).json({
		message: "Submission already found. Duplicate submission"
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
	const { assignmentId, link } = req.body;
	const { path } = req.file || { path: null };

	const assignment = await models.assignment.findOne({
		where: {
			id: assignmentId
		}
	});

	if (!assignment) return assignmentNotFound(res);

	const isSubmissionExist = await models.submission.findOne({
		where: {
			assignmentId: assignmentId,
			submittedBy: req.user.id
		}
	});

	if (isSubmissionExist) return duplicatedSubmission(res);

	if (link && path) return isDoubleWay(res);

	if (!link && !path) return noSubmission(res);

	const submission = await models.submission.create({
		assignmentId: assignmentId,
		submittedBy: req.user.id,
		...(path && { file: path }),
		...(link && { link: link })
	});

	return res.json({
		message: "Assignment submitted",
		submission: submission
	});
});
