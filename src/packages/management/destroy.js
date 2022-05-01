const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => { 
  const { userId } = req.params;

  const user = await models.user.findByPk(userId);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "Didn't found user"
    })
  }

  await user.destroy();

  return res.json({
		message: "User deleted",
	});
})