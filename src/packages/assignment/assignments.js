const asyncHandler = require("express-async-handler");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const assignments = await models.assignment.findAll();

	return res.json(assignments);
});
