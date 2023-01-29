const router = require("express").Router();

const {
  createGame,
  getGameDetails,
} = require("../controllers/games.controller");

router.post("/add", createGame);
router.get("/:id", getGameDetails);

module.exports = router;
