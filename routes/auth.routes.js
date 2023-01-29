const router = require("express").Router();

const { login, createUser } = require("../controllers/auth.controller");

router.post("/login", login);
router.post("/register", createUser);

module.exports = router;
