const { Router } = require("express");
const isAuthenticated = require("../../middlewares/guard/isAuthenticated");
const isAuthorized = require("../../middlewares/guard/isAuthorized");
const { ADMIN } = require("../../utils/roles.const");
const isUnauthenticated = require("../../middlewares/guard/isUnauthenticated");
const { isValidated } = require("../../utils/validator");
const authUser = require("./authUser");
const login = require("./login");
const loginRules = require("./login.rules");
const signup = require("./signup");
const signupRules = require("./signup.rules");
const addUser = require("./addUser");
const destroy = require("./destroy");

const authRoutes = Router();

// Get signed in user
authRoutes.get("/user", authUser);

// Login
authRoutes.post("/login", isUnauthenticated, isValidated(loginRules), login);

// Sign up
authRoutes.post("/signup", isUnauthenticated, isValidated(signupRules), signup);

/*
 ***** ADMIN ROUTES *****
 */

// Add user
authRoutes.post("/user", isAuthenticated, isAuthorized(ADMIN), addUser);

// Remove user
authRoutes.delete(
	"/user/:userId",
	isAuthenticated,
	isAuthorized(ADMIN),
	destroy
);

module.exports = authRoutes;
