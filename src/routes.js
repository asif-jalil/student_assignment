const assignmentRoutes = require("./packages/assignment/assignment.route");
const authRoutes = require("./packages/auth/auth.route");
const managementRoutes = require("./packages/management/management.route");

const routes = app => {
	app.use("/api/auth", authRoutes);
	app.use("/api/assignment", assignmentRoutes);
	app.use("/api/management", managementRoutes);
};

module.exports = routes;
