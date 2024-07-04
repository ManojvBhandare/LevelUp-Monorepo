const express = require("express");
const router = express.Router();
const z = require("zod");
const { User, Goal } = require("../db");
const { authMiddleware } = require("../middleware");

const ansBody = z.object({
  title: z.string(),
  targetAmount: z.number(),
  duration: z.string(),
});

// const AnswerBody = z.object({
//   assignmentCode: z.string(),
//   answers: z.array(ansBody),
//   plagiarismReport: z.number().optional(),
//   time: z.string(), // Ensure time is a string representing a date
// });

router.post("/postgoal", authMiddleware, async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Request headers:", req.headers);

  const result = ansBody.safeParse(req.body);
  if (!result.success) {
    console.log("Validation error:", result.error);
    return res.status(411).json({
      message: "Inputs are invalid.",
    });
  }

  try {
    await Goal.create({
      userId: req.body.assignmentCode,
      studentRollNumber: student.rollnumber, // Use the student's roll number from the database
      studentName: student.username, // Use the student's name from the database
      answers: req.body.answers,
      plagiarismReport: req.body.plagiarismReport,
      time: new Date(req.body.time),
    });

    res.json({ message: "Answer Submitted Successfully" });
  } catch (error) {
    console.error("Error saving answer: ", error);
    res.status(500).json({ message: "Failed to submit the answer" });
  }
});

router.get("/getgoal", authMiddleware, async (req, res) => {
  try {
    const goal = await Goal.find({
      userId: req.userId,
    });
    res.json({ goal });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

module.exports = router;
//TODOs
// Answer route when request by  student in front end
// get answer route
