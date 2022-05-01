const { Router } = require("express");
const isAuthenticated = require("../../middlewares/guard/isAuthenticated");
const isAuthorized = require("../../middlewares/guard/isAuthorized");
const { ADMIN } = require("../../utils/roles.const");
const changeStatus = require("./changeStatus");
const destroy = require("./destroy");
const students = require("./students");
const teachers = require("./mentors");

const managementRoutes = Router();

// Get teachers
managementRoutes.get(
	"/teachers",
	isAuthenticated,
	isAuthorized([ADMIN]),
	teachers
);

// Get students
managementRoutes.get(
	"/students",
	isAuthenticated,
	isAuthorized([ADMIN]),
	students
);

// Delete User
managementRoutes.delete(
	"/:userId",
	isAuthenticated,
	isAuthorized([ADMIN]),
	destroy
);

// Change user status
managementRoutes.put(
	"/status/:userId",
	isAuthenticated,
	isAuthorized([ADMIN]),
	changeStatus
);

module.exports = managementRoutes;
