const express = require("express");
const cors = require("cors")
const { userRouter } = require("./router/user.router");
const { connection } = require("./config/db");
const jwt = require("jsonwebtoken");
const { auth } = require("./config/middleware/auth.middle");
require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json()); //json parsar

//user router
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("welcome dear");
});

app.get("/cart", (req, res) => {
  res.send(cart);
});

app.get("data", auth, (req, res) => {
  res.send(data);
});

app.get("/report", auth, (req, res) => {
  res.send("report");
});

app.listen(process.env.port || 5000, async() => {
  await connection
  console.log("Database is connected")
  console.log(`${process.env.port} is working`);
});
