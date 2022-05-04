const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const { gradeId } = req.params;

	const grade = await models.gradeSheet.findOne({
		where: {
			id: gradeId
		}
	});

	if (!grade)
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: "Grade not found."
		});

	await grade.destroy();

	return res.json({
		message: "Deleted successfully",
		gradeId
	});
});
