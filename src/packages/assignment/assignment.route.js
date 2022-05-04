const { Router } = require("express");
const isAuthenticated = require("../../middlewares/guard/isAuthenticated");
const isAuthorized = require("../../middlewares/guard/isAuthorized");
const { uploadFile } = require("../../middlewares/uploader");
const { ADMIN, MENTOR, STUDENT } = require("../../utils/roles.const");
const { isValidated } = require("../../utils/validator");
const assignments = require("./assignments");
const create = require("./create");
const createRules = require("./create.rules");
const grade = require("./grade");
const gradeRules = require("./grade.rules");
const submission = require("./submission");
const submissionRules = require("./submission.rules");
const submissions = require("./submissions");

const assignmentRoutes = Router();

// Get all assignment
assignmentRoutes.get("/", isAuthenticated, isAuthorized(ADMIN), assignments);

// Add assignment
assignmentRoutes.post(
	"/",
	isAuthenticated,
	isAuthorized(ADMIN, MENTOR),
	isValidated(createRules),
	create
);

// Get all submission
assignmentRoutes.get("/submission", isAuthenticated, submissions);

assignmentRoutes.post(
	"/submission/:assignmentId",
	isAuthenticated,
	isAuthorized(ADMIN, STUDENT),
	uploadFile.single("file"),
	isValidated(submissionRules),
	submission
);

assignmentRoutes.patch(
	"/grade/:submissionId",
	isAuthenticated,
	isAuthorized(ADMIN, MENTOR),
	isValidated(gradeRules),
	grade
);

module.exports = assignmentRoutes;
