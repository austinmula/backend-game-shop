const connection = require("../db/config");
const bcrypt = require("bcrypt");
const { jwtGenerator, sendError } = require("../utils/helpers");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //check if the user exists
    let query = "SELECT * FROM users WHERE email = ?";

    await connection.query(query, [email], async (error, response) => {
      if (error) return sendError(res, error, 400);

      if (response.length !== 0)
        return sendError(res, "User already Exists", 401);

      // if user doesn't exist create new one
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);

      // // add user to db
      await connection.query(
        "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)",
        [name, email, bcryptPassword, 1],
        (error, response) => {
          if (error) return sendError(res, error, 400);

          res.json({
            success: true,
            msg: "User Added Successfuly",
            data: response,
            status: 200,
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    let query = "SELECT * FROM users WHERE email = ?";
    await connection.query(query, [email], async (error, response) => {
      if (error) return sendError(res, error, 400);

      if (response.length === 0)
        return sendError(res, "User Does not Exist", 401);

      // Now check if password is correct
      const validPassword = await bcrypt.compare(
        password,
        response[0].password
      );

      if (!validPassword)
        return sendError(res, "Incorrect Email or Password", 401);

      // Assign JWT
      const token = jwtGenerator(response[0].id);
      res.json({
        token: token,
        role_id: response[0].role_id,
        email: response[0].email,
        name: response[0].name,
        user_id: response[0].id,
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal Server error");
  }
};
