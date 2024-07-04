const express = require("express");
const mainRouter = require("./routes/index");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend origin
    credentials: true,
  })
);

app.use(express.json());
app.use("/level", mainRouter);

app.listen(3002);
