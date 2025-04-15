const Transaction = require("../models/Transaction");
const User = require("../models/User");

exports.processTransaction = async (req, res) => {
  const { sender, receiver, amount, currency } = req.body;
  console.log("transaction called");
  try {
    console.log("transaction check");
    const senderExists = await User.findOne({ name: sender });
    console.log("transaction check done");
    const receiverExists = await User.findOne({ name: receiver });
    console.log(senderExists);
    console.log(receiverExists);
    var senderExistingBal = 0,
      receiverExistingBal = 0;
    if (currency == "EUR") {
      senderExistingBal = senderExists.balance.EUR;
      console.log(senderExistingBal);
      receiverExistingBal = receiverExists.balance.EUR;
      console.log(receiverExistingBal);
    } else if (currency == "INR") {
      senderExistingBal = senderExists.balance.INR;
      console.log(senderExistingBal);
      receiverExistingBal = receiverExists.balance.INR;
      console.log(receiverExistingBal);
    }
    if (senderExists != null && receiverExists != null) {
      if (senderExistingBal <= 0) {
        res.status(500).json({
          msg: "Sender doesnt have balance to transfer " + amount,
          error: err.message,
        });
      }
      const transaction = await Transaction.create({
        sender: senderExists,
        receiver: receiverExists,
        amount: amount,
        currency: currency,
      });
      console.log("transaction record created");
      const senderBalUpdate = await User.updateOne(
        { name: sender },
        { balance: { EUR: (senderExistingBal -= amount) } },
      );
      console.log("sender bal updated ");
      const receiverBalUpdate = await User.updateOne(
        { name: receiver },
        { balance: { EUR: (receiverExistingBal += amount) } },
      );
      console.log("receiver bal updated");
      res.status(201).json({
        id: transaction._id,
        sender: transaction.sender,
        senderBalUpdate,
        receiverBalUpdate,
      });
    } else {
      res
        .status(500)
        .json({ msg: "Sender or Receiver dont exist", error: err.message });
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.retrieveTransaction = async (req, res) => {
  const userId = req.params.user;
  console.log("transaction called");
  try {
    console.log("transaction get");
    const user = await User.findOne({ name: userId });
    if (user) {
      const senderTransactions = await Transaction.find({ sender: user });
      const receiverTransactions = await Transaction.find({ receiver: user });

      res.status(201).json({ senderTransactions, receiverTransactions });
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
