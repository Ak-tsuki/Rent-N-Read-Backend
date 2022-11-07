const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Importing Database Connection
const connectDB = require('./config/dbconnection');
connectDB();

// Importing Routers // Models are imported in routers
const userRouter = require('./routers/userRouter');

app.use(userRouter);

app.listen(90);

module.exports = app;

