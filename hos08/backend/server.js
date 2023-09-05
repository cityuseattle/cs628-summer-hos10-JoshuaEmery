const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5050;
const app = express();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");

app.use(cors());

connectDB();

//this allows us to use the body of the request
//you will get undefined if you don't have this
app.use(express.json());
//this allows us to use url encoded data
//this is for when you submit a form
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/records", require("./routes/recordRoutes"));

app.use(errorHandler);
