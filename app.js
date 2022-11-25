const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(__dirname + "/bookImgs"));

// Importing Database Connection
const connectDB = require("./config/dbconnection");
connectDB();

// Importing Routers // Models are imported in routers
const userRouter = require("./routers/userRouter");
const bookRouter = require("./routers/bookRouter");
const rentRouter = require("./routers/rentRouter");
const paymentRouter = require("./routers/paymentRouter");

app.use(userRouter);
app.use(bookRouter);
app.use(rentRouter);
app.use(paymentRouter);

app.listen(90);

module.exports = app;
