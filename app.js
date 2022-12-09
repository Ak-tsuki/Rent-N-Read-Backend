const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(__dirname + "/bookImgs"));
app.use(express.static(__dirname + "/audiobooks"));
app.use(express.static(__dirname + "/ebooks"));
// Importing Database Connection
const connectDB = require("./config/dbconnection");
connectDB();

// Importing Routers // Models are imported in routers
const userRouter = require("./routers/userRouter");
const bookRouter = require("./routers/bookRouter");
const audiobookRouter = require("./routers/audiobookRouter");
const rentRouter = require("./routers/rentRouter");
const paymentRouter = require("./routers/paymentRouter");
const eBookRouter = require("./routers/eBookRouter");
const exchangeRouter = require("./routers/exchangeRouter");
const recommendationRouter = require("./routers/recommendationRouter");
const buyaudiobookRouter = require("./routers/buyaudiobookRouter");

app.use(userRouter);
app.use(bookRouter);
app.use(audiobookRouter);
app.use(rentRouter);
app.use(paymentRouter);
app.use(eBookRouter);
app.use(exchangeRouter);
app.use(recommendationRouter);
app.use(buyaudiobookRouter);


app.listen(90);

module.exports = app;
