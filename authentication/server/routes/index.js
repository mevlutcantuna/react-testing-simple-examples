const express = require("express");
const { login, signup, getUser } = require("../controllers/index");

const router = express.Router();

router.post("/api/auth/login", login);
router.post("/api/auth/signup", signup);
router.get("/api/auth/get-user", getUser);

module.exports = router;
