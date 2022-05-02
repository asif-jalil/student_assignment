const { Router } = require("express");
const isAuthenticated = require("../../middlewares/guard/isAuthenticated");
const isAuthorized = require("../../middlewares/guard/isAuthorized");
const { ADMIN, MENTOR } = require("../../utils/roles.const");
const { isValidated } = require("../../utils/validator");
const create = require("./create");
const createRules = require("./create.rules");

const assignmentRoutes = Router();

assignmentRoutes.post(
	"/",
	isAuthenticated,
	isAuthorized(ADMIN, MENTOR),
	isValidated(createRules),
	create
);

module.exports = assignmentRoutes;
