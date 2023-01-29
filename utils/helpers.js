const jwt = require("jsonwebtoken");

exports.sendError = (res, error, status = 401) => {
  console.log(error);
  res.status(status).json({ success: false, message: error });
};

exports.jwtGenerator = (user_id) => {
  const payload = {
    id: user_id,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.mapItemToId = (id, data) => {
  return data.map((item) => {
    return [id, item];
  });
};
