const express = require("express");
const router = express.Router();

// import controllers
const {
	updateUser,
	deleteUser,
	getUser,
	getUsers,
  } =require ("../controllers/user");
  const { verifyAdmin, verifyUser } = require ( "../utils/verifyToken");
const {
	register,
	login,
	logout,
	getLoggedInUser,
	forgotPassword,
	resetPassword
} = require("../controllers/user");

// import middlewares
const { userRegisterValidator, userById } = require("../middlewares/user");
const { verifyToken } = require("../middlewares/auth");

// api routes
router.post("/Signup", userRegisterValidator, register);
router.post("/Login", login);
router.get("/logout", logout);
// router.post("/forgotPassword", forgotPassword); // Add forgotPassword route here
router.post("/resetpassword", resetPassword);
router.get("/user", verifyToken, userById, getLoggedInUser);
//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

module.exports = router;
