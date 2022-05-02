const { Op } = require("sequelize");
const models = require("../models");
const { APPROVED } = require("./status.const");

module.exports = async (userId, roles) => {
	const users = await models.user.findOne({
		attribute: ["role"],
		where: {
			id: userId,
			status: APPROVED,
			role: {
				[Op.or]: roles
			}
		},
		raw: true
	});

	return users?.role || false;
};
