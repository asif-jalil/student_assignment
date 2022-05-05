const assignmentRoutes = require("./packages/assignment/assignment.route");
const authRoutes = require("./packages/auth/auth.route");

const routes = app => {
	app.use("/api/auth", authRoutes);
	app.use("/api/assignment", assignmentRoutes);
};

module.exports = routes;
