const router = require("express").Router();

const {
  login,
  createUser,
  allUsers,
} = require("../controllers/auth.controller");

router.post("/login", login);
router.get("/", allUsers);
router.post("/register", createUser);

module.exports = router;
