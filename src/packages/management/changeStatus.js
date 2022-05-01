const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
  const { userId } = req.params;
	const { status } = req.body;

  const user = await models.user.findByPk(userId);
  
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "Didn't found user"
    })
  }

	if (user.status === status) {
		return res.status(StatusCodes.NOT_ACCEPTABLE).json({
			message: "User is already in this status"
		});
	}

	await user.update({
		status: status
	});

	return res.json({
		message: "User status changed"
	});
});
