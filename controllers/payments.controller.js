const con = require("../db/config");
const { sendError } = require("../utils/helpers");

exports.makePayment = (req, res) => {
  try {
    const { game_id, user_id, amount } = req.body;
    let query =
      "INSERT INTO purchases (game_id, user_id, amount) VALUES (?, ?, ?)";
    con.query(query, [game_id, user_id, amount], (error, response) => {
      if (error) return sendError(res, error, 400);

      res.send("Purchase Success");
    });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

exports.getPayments = (req, res) => {
  try {
    let query =
      "SELECT * FROM purchases LEFT JOIN games ON games.id = purchases.game_id;";

    con.query(query, (error, response) => {
      if (error) return sendError(res, error, 400);

      res.send(response);
    });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};
