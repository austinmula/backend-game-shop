const router = require("express").Router();

const {
  createGame,
  getGameDetails,
  getAllGames,
  getGamesByCategory,
  getGamesByConsole,
  deleteGame,
} = require("../controllers/games.controller");

router.post("/add", createGame);
router.get("/:id", getGameDetails);
router.get("/", getAllGames);
router.get("/category/:id", getGamesByCategory);
router.get("/console/:id", getGamesByConsole);
router.delete("/:id", deleteGame);

module.exports = router;
