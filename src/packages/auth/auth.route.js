const { Router } = require("express");
const isUnauthenticated = require("../../middlewares/guard/isUnauthenticated");
const { isValidated } = require("../../utils/validator");
const authUser = require("./authUser");
const login = require("./login");
const loginRules = require("./login.rules");
const signup = require("./signup");
const signupRules = require("./signup.rules");

const authRoutes = Router();

// Get signed in user
authRoutes.get("/user", authUser);

// Login
authRoutes.post("/login", isUnauthenticated, isValidated(loginRules), login);

// Sign up
authRoutes.post("/signup", isUnauthenticated, isValidated(signupRules), signup);

module.exports = authRoutes;
