const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const z = require("zod");
const { Transaction, User } = require("../db");
const { authMiddleware } = require("../middleware");

const JWT_SECRET = "Manoj";

router.post("/send", authMiddleware, async (req, res) => {
  try {
    const Transaction = await Transaction.create({
      userId: req.userId,
      date: new Date(),
      amount: req.body.amount,
      category: req.body.category,
      to: req.body.to,
    });

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
      message: "Teacher account created Successfully!",
      token: token,
    });
  } catch (error) {
    console.error("Error Transaction", error);
    res.status(500).json({
      message: "Error occured",
    });
  }
});

//signin post req
router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Invalid Inputs!!",
    });
  }

  const user = await Teacher.findOne({
    mailId: req.body.mailId,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in!",
  });
});

router.get("/getTransaction", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.userId,
    });
    if (transactions.length === 0) {
      throw new Error("No Transactions Found");
    }
    res.json({
      transactions: transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
