const router = require("express").Router();

const {
  makePayment,
  getPayments,
} = require("../controllers/payments.controller");

router.post("/add", makePayment);
router.get("/", getPayments);

module.exports = router;
