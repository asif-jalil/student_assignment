const asyncHandler = require("express-async-handler");
const models = require("../../models");
const { MENTOR } = require("../../utils/roles.const");

module.exports = asyncHandler(async (req, res) => {
	const teachers = await models.user.findAll({
		where: {
			role: MENTOR
		}
	});

	return res.json({ teachers });
});
