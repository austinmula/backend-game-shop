const { mapItemToId, sendError } = require("../utils/helpers");
const con = require("../db/config");

exports.getGameDetails = async (req, res) => {
  let query = "SELECT * from games WHERE id = ?";
  await con.query(query, [req.params.id], (error, response) => {
    if (error) return sendError(res, error, 400);
    let data = response[0];

    let query =
      "SELECT categories.name from games LEFT JOIN game_category ON games.id = game_category.game_id INNER JOIN categories ON categories.id = game_category.category_id WHERE games.id=?;";
    con.query(query, [req.params.id], (error, response) => {
      if (error) return sendError(res, error, 400);

      data = { ...data, category: response };

      let query =
        "SELECT consoles.name from games LEFT JOIN game_console ON games.id = game_console.game_id INNER JOIN consoles ON consoles.id = game_console.console_id WHERE games.id=?;";
      con.query(query, [req.params.id], (error, response) => {
        if (error) return sendError(res, error, 400);

        data = { ...data, consoles: response };

        res.send(data);
      });
    });
  });
};

exports.getAllGames = async (req, res) => {
  let query = "SELECT * from games";
  await con.query(query, [req.params.id], (error, response) => {
    if (error) return sendError(res, error, 400);

    res.send(response);
  });
};

exports.createGame = async (req, res) => {
  const { name, description, image, price, publisher, category, consoles } =
    req.body;

  try {
    let query =
      "INSERT INTO games (name, description, image, price, publisher) VALUES (?, ?, ?, ?, ?)";
    await con.query(
      query,
      [name, description, image, price, publisher],
      async (error, response) => {
        if (error) return sendError(res, error, 400);

        const game_category = mapItemToId(response.insertId, category);
        const game_console = mapItemToId(response.insertId, consoles);

        await con.query(
          "INSERT INTO game_category (game_id, category_id) VALUES ?",
          [game_category],
          (error, response) => {
            if (error) return sendError(res, error, 400);
          }
        );

        await con.query(
          "INSERT INTO game_console (game_id, console_id) VALUES ?",
          [game_console],
          (error, response) => {
            if (error) return sendError(res, error, 400);
          }
        );

        res.send("successfuly Added");
      }
    );
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};
