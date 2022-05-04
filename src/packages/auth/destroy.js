const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const { userId } = req.params;

	const user = await models.user.findOne({
		where: {
			id: userId
		}
	});

	if (!user)
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: "User not found."
		});

	await user.destroy();

	return res.json({
		message: "User deleted successfully!",
		userId
	});
});
