const { Sequelize, Op } = require("sequelize");
const models = require("../../models");

module.exports = async userId => {
	let user = await models.user.findOne({
		where: { id: userId },
		include: {
			model: models.course,
			as: "enrolledCourses",
			through: {
				models: models.enrollment
			},
			include: {
				model: models.user,
				as: "mentor"
			}
		}
	});

	await user.updateLastLoginAt();
	delete user.lastLoginAt;

	user = user.toJSON();

	const courses = await models.course.findAll({
		where: {
			creatorId: userId
		}
	});

	user.courses = courses;

	return user;
};
