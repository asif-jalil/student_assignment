const models = require("../../models");

module.exports = async userId => {
	let user = await models.user.findOne({
		where: { id: userId }
	});

	user = user.toJSON();

	return user;
};
