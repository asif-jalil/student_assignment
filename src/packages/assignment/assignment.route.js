const { Router } = require("express");
const isAuthenticated = require("../../middlewares/guard/isAuthenticated");
const isAuthorized = require("../../middlewares/guard/isAuthorized");
const { uploadFile } = require("../../middlewares/uploader");
const { ADMIN, MENTOR, STUDENT } = require("../../utils/roles.const");
const { isValidated } = require("../../utils/validator");
const create = require("./create");
const createRules = require("./create.rules");
const submission = require("./submission");
const submissionRules = require("./submission.rules");

const assignmentRoutes = Router();

// Add assignment
assignmentRoutes.post(
	"/",
	isAuthenticated,
	isAuthorized(ADMIN, MENTOR),
	isValidated(createRules),
	create
);

assignmentRoutes.post(
	"/submission/:assignmentId",
	isAuthenticated,
	isAuthorized(ADMIN, STUDENT),
	uploadFile.single("file"),
	isValidated(submissionRules),
	submission
);

module.exports = assignmentRoutes;
