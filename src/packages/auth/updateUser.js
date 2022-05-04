const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const { userId } = req.body;

	const user = await models.user.findByPk(userId);

	if (!user)
		return res.status(StatusCodes.NOT_FOUND).json({
			message: "User not found"
		});

	await user.update({
		email: req.body.email || user.email,
		password: req.body.password || user.password,
		role: req.body.role || user.role,
		name: req.body.name || user.name,
		status: req.body.status || user.status
	});

	return res.json({
		message: "User info updated",
		user
	});
});
