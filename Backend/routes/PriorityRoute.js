const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { z } = require("zod");
const { User, Priority, Goal } = require("../db");
const { default: mongoose } = require("mongoose");

//create assignment
router.post("/create", authMiddleware, async (req, res) => {
  const { success } = assignmentBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Invalid input types",
    });
  }
  const ExistingAssignment = await Assignment.findOne({
    assignmentCode: req.body.assignmentCode,
  });

  if (ExistingAssignment) {
    return res.status(411).json({
      message: "Assignment Code is already taken",
    });
  }
  const assignment = await Assignment.create({
    teacherId: req.userId,
    assignmentCode: req.body.assignmentCode,
    title: req.body.title,
    questions: req.body.questions,
    plag: req.body.plag,
    deadline: req.body.deadline,
  });

  res.status(200).json({ assignment });
});
//view assignment
router.get("/getpriority", authMiddleware, async (req, res) => {
  try {
    const priority = await Priority.find({
      userId: req.userId,
    });

    res.json({
      priority: priority,
    });
  } catch (error) {
    console.error("Error fetching Priority", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/postpriority", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { Friends, Food, Entertainment, Grocery, Others } = req.body;

    const newPriority = new Priority({
      userId,
      Friends,
      Food,
      Entertainment,
      Grocery,
      Others,
    });

    await newPriority.save();
    res.status(201).json({ message: "Priority data saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/calculateDailylimit", authMiddleware, async (req, res) => {
  try {
    const priority = await Priority.findOne({ userId: req.userId });
    if (!priority) {
      return res.status(404).json({ message: "Priority not found" });
    }

    const { Friends, Food, Entertainment, Grocery, Others } = priority;
    const list = { Friends, Food, Entertainment, Grocery, Others };

    const user = await User.findOne({ _id: req.userId });
    const expectedSaving = user.expectedSaving;

    const salary = user.income;
    const moneyRemaining = user.balance; // Replace with actual value

    // const RdaysRemaining = () => {
    //   const today = new Date();
    //   const lastDayOfMonth = new Date(
    //     today.getFullYear(),
    //     today.getMonth() + 1,
    //     0
    //   );
    //   return lastDayOfMonth.getDate() - today.getDate();
    // }; // Replace with actual value
    const daysRemaining = 3;
    const result = await evaluate(
      list,
      salary,
      expectedSaving,
      moneyRemaining,
      daysRemaining
    );

    const updatedFields = {};
    for (let category in result.list) {
      if (list[category].allowed !== result.list[category].allowed) {
        updatedFields[`${category}.allowed`] = result.list[category].allowed;
      }
    }

    const upi = await Priority.updateOne(
      { userId: req.userId },
      { $set: updatedFields }
    );

    res.status(200).json({ result, upi });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

async function evaluate(list, salary, goal, moneyRemaining, daysRemaining) {
  let expTotal = 0;
  let maxAllowed = salary - goal;
  let worstCase = 0;
  let probability = 1;

  for (let category in list) {
    expTotal += list[category].exp;
    worstCase += (list[category].priority / 100) * list[category].exp;
  }

  let possible = true;
  if (
    worstCase > maxAllowed ||
    moneyRemaining < (worstCase / 30) * daysRemaining + goal
  ) {
    console.log("Not possible");
    possible = false;
    probability = 0;
  } else {
    console.log("Possible");
    let perDayIdeal = maxAllowed / 30;
    let perDayCurrent = (moneyRemaining - goal) / daysRemaining;
    probability = perDayIdeal / perDayCurrent;
    if (probability > 1) {
      probability = 1 / probability;
    }
    console.log(probability);
  }

  if (possible) {
    if (moneyRemaining - expTotal >= goal) {
      // Goal can be achieved with current spending
    } else {
      let sorted = [];
      for (let category in list) {
        sorted.push([
          category,
          list[category].exp,
          list[category].priority,
          list[category].allowed,
        ]);
      }

      sorted.sort((a, b) => a[2] - b[2]);
      let extraToBeSaved = goal - (moneyRemaining - expTotal);

      for (let i in sorted) {
        if (extraToBeSaved === 0) {
          break;
        } else if (
          ((100 - list[sorted[i][0]].priority) / 100) * list[sorted[i][0]].exp <
          extraToBeSaved
        ) {
          list[sorted[i][0]].allowed -=
            ((100 - list[sorted[i][0]].priority) / 100) *
            list[sorted[i][0]].exp;
          extraToBeSaved -=
            ((100 - list[sorted[i][0]].priority) / 100) *
            list[sorted[i][0]].exp;
        } else {
          list[sorted[i][0]].allowed -= extraToBeSaved;
          extraToBeSaved = 0;
        }
      }
    }

    let daily = {};
    for (let category in list) {
      daily[category] = list[category].allowed / daysRemaining;
    }
    console.log(daily);
    console.log(list);
    resolve({ daily, probability, list });
  }

  return { message: "Not possible", probability };
}

router.get("/wellness", authMiddleware, async (req, res) => {
  try {
    const { Friends, Food, Entertainment, Grocery, Others } =
      await Priority.findOne({ userId: req.userId });
    recommended_list = { Friends, Food, Entertainment, Grocery, Others };
    let total_priority = 0;

    for (let i in recommended_list) {
      total_priority += recommended_list[i].priority;
    }

    let wellness_numerator = 0;
    for (let i in recommended_list) {
      wellness_numerator += total_priority += recommended_list[i].priority;

      recommended_list[i].priority *
        (recommended_list[i].allowed / recommended_list[i].exp);
    }

    let wellness_score = wellness_numerator / total_priority;
    res.json(wellness_score);
    console.log(wellness_score);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
