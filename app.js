const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

// Importing Database Connection
const connectDB = require('./config/dbconnection');
connectDB();

app.listen(90);

module.exports = app;

