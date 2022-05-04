const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { ADMIN } = require("../../utils/roles.const");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const { submissionId, mark } = req.body;

	const submission = await models.submission.findOne({
		where: {
			id: submissionId
		},
		include: {
			model: models.assignment,
			as: "assignment"
		}
	});

	if (!submission)
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: "Your submission is not found. Please try again"
		});

	if (submission.assignment.mentor !== req.user.id && req.user.role !== ADMIN)
		return res.status(StatusCodes.FORBIDDEN).json({
			message: "You have no permission to grade this assignment"
		});

	let grade = await models.gradeSheet.findOne({
		where: {
			submissionId: submissionId
		}
	});

	if (!grade) {
		grade = await models.gradeSheet.create({
			submissionId: submissionId,
			mark: mark
		});
	}

	await grade.update({
		mark: mark,
		...(req.body.remark && { remark: req.body.remark })
	});

	return res.json({
		message: "Grade updated",
		grade
	});
});
