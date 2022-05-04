const { Router } = require("express");
const isAuthenticated = require("../../middlewares/guard/isAuthenticated");
const isAuthorized = require("../../middlewares/guard/isAuthorized");
const { uploadFile } = require("../../middlewares/uploader");
const { ADMIN, MENTOR, STUDENT } = require("../../utils/roles.const");
const { isValidated } = require("../../utils/validator");
const assignments = require("./assignments");
const create = require("./create");
const createRules = require("./create.rules");
const destroy = require("./destroy");
const destroyGrade = require("./destroyGrade");
const destroySubmission = require("./destroySubmission");
const grade = require("./grade");
const gradeRules = require("./grade.rules");
const patchSubmission = require("./patchSubmission");
const patchUpdate = require("./patchUpdate");
const patchUpdateRules = require("./patchUpdate.rules");
const submission = require("./submission");
const submissionRules = require("./submission.rules");
const submissions = require("./submissions");

const assignmentRoutes = Router();

// Get all assignment
assignmentRoutes.get("/", isAuthenticated, isAuthorized(ADMIN), assignments);

// Create assignment
assignmentRoutes.post(
	"/",
	isAuthenticated,
	isAuthorized(ADMIN, MENTOR),
	isValidated(createRules),
	create
);

assignmentRoutes.patch(
	"/",
	isAuthenticated,
	isAuthorized(ADMIN),
	isValidated(patchUpdateRules),
	patchUpdate
);

// Delete Assignment
assignmentRoutes.delete(
	"/:assignmentId",
	isAuthenticated,
	isAuthorized(ADMIN),
	destroy
);

// Get all submission
assignmentRoutes.get("/submission", isAuthenticated, submissions);

// Make submission
assignmentRoutes.post(
	"/submission",
	isAuthenticated,
	isAuthorized(ADMIN, STUDENT),
	uploadFile.single("file"),
	isValidated(submissionRules),
	submission
);

// Edit submission
assignmentRoutes.patch(
	"/submission",
	isAuthenticated,
	isAuthorized(ADMIN),
	uploadFile.single("file"),
	isValidated(submissionRules),
	patchSubmission
);

// Delete submission
assignmentRoutes.delete(
	"/submission/:submissionId",
	isAuthenticated,
	isAuthorized(ADMIN),
	destroySubmission
);

// Grade a submission
assignmentRoutes.patch(
	"/grade",
	isAuthenticated,
	isAuthorized(ADMIN, MENTOR),
	isValidated(gradeRules),
	grade
);

// Delete a grade by admin
assignmentRoutes.delete(
	"/grade/:gradeId",
	isAuthenticated,
	isAuthorized(ADMIN),
	destroyGrade
);

module.exports = assignmentRoutes;
