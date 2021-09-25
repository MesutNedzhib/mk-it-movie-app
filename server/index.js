const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase.js");
const routers = require("./routers");
const cors = require("cors");
const customErrorHandler = require("./middlewares/error/customErrorHandler.js");

const app = express();

// Express - Body Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Environment Variables
dotenv.config({
  path: "./config/env/config.env",
});
const PORT = process.env.PORT;

// Connect MongoDB
connectDatabase();

// Routers Middleware
app.use("/api", routers);

// Error Handler
app.use(customErrorHandler);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Movie App Api",
  });
});

app.listen(PORT, () => {
  console.log(`App started on ${PORT} : http://localhost:${PORT}`);
});
