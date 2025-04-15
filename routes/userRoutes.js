const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const {
  processTransaction,
  retrieveTransaction,
} = require("../controllers/transactionController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/transaction", processTransaction);
router.get("/getTransactions/:user", retrieveTransaction);

module.exports = router;
