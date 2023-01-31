const router = require("express").Router();

const {
  createGame,
  getGameDetails,
  getAllGames,
  getGamesByCategory,
  getGamesByConsole,
} = require("../controllers/games.controller");

router.post("/add", createGame);
router.get("/:id", getGameDetails);
router.get("/", getAllGames);
router.get("/category/:id", getGamesByCategory);
router.get("/console/:id", getGamesByConsole);

module.exports = router;
