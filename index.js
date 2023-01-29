require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db/config");

const PORT = process.env.PORT || 4001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", require("./routes/auth.routes"));
app.use("/api/games", require("./routes/games.routes"));
app.use("/api/payments", require("./routes/payments.routes"));
// app.use("/api/subscriptions", require("./routes/subscriptions.routes"));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
