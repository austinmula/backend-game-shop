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
  try {
    let query = "SELECT * from games";
    await con.query(query, (error, response) => {
      if (error) return sendError(res, error, 400);

      res.send(response);
    });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

exports.deleteGame = async (req, res) => {
  try {
    let query = "DELETE from games WHERE id=?";
    await con.query(query, [req.params.id], (error, response) => {
      if (error) return sendError(res, error, 400);

      res.send(response);
    });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

exports.getGamesByCategory = (req, res) => {
  const category = req.params.id;
  console.log(category);
  try {
    let query = "SELECT * from all_categories WHERE category LIKE ?";
    con.query(query, ["%" + category + "%"], (error, response) => {
      if (error) return sendError(res, error, 400);

      res.send(response);
    });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

exports.getGamesByConsole = (req, res) => {
  const platf = req.params.id;
  console.log(platf);
  try {
    let query = "SELECT * from all_consoles WHERE console LIKE ?";
    con.query(query, ["%" + platf + "%"], (error, response) => {
      if (error) return sendError(res, error, 400);

      res.send(response);
    });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

exports.createGame = async (req, res) => {
  let new_id;
  const {
    name,
    description,
    image,
    price,
    publisher,
    category,
    consoles,
    rating,
  } = req.body;

  try {
    let query =
      "INSERT INTO games (name, description, image, price, publisher, rating) VALUES (?, ?, ?, ?, ?, ?)";
    await con.query(
      query,
      [name, description, image, price, publisher, rating],
      async (error, response) => {
        if (error) return sendError(res, error, 400);

        const game_category = mapItemToId(response.insertId, category);
        const game_console = mapItemToId(response.insertId, consoles);

        new_id = response.insertId;

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

        con.query(
          "SELECT * FROM games where id = ?",
          [new_id],
          (error, response) => {
            if (error) return sendError(res, error, 400);

            res.send(response[0]);
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};
