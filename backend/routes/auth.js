const express = require("express");
const { registerController, loginController, usersListController, currentUserController } = require("../controllers/authController");

const router = express.Router();

router.get("/me", currentUserController);
router.get("/users", usersListController);
router.post("/register", registerController);
router.post("/login", loginController);



module.exports = router;