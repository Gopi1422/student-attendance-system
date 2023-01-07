const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyparser = require("body-parser");

const Connection = require("./database/db");
const Routes = require("./routes/route");

const app = express();

dotenv.config();

app.use(bodyparser.json({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", Routes);

const PORT = process.env.PORT || 8000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
