require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(__dirname + "/bookImgs"));
app.use(express.static(__dirname + "/audiobooks"));
app.use(express.static(__dirname + "/ebooks"));
// Importing Database Connection
const connectDB = require("./config/dbconnection");
connectDB();

app.use(
  cookieSession({
    name: "session",
    keys: ["akatsuki"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

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
const buyEbookRouter = require("./routers/buyEbookRouter");
const rentEBookRouter = require("./routers/rentEbookRouter");
const wishlistRouter = require("./routers/wishlistRouter");

const passportSetup = require("./passport");
const thirdpartyRouter = require("./routers/thirdpartyRouter");

// message
const conversationRouter = require("./routers/conversationRouter");
const messageRouter = require("./routers/messageRouter");

app.use(userRouter);
app.use(bookRouter);
app.use(audiobookRouter);
app.use(rentRouter);
app.use(paymentRouter);
app.use(eBookRouter);
app.use(exchangeRouter);
app.use(recommendationRouter);
app.use(buyaudiobookRouter);
app.use(buyEbookRouter);
app.use(rentEBookRouter);
app.use(wishlistRouter);

app.use(thirdpartyRouter);

// message
app.use(conversationRouter);
app.use(messageRouter);

const server = app.listen(90);

// socket
const io = require("socket.io")(server, {
  pingTimeout: 6000,
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // when connect
  console.log("a user connected");
  // take username and socketId from user
  socket.on("addUser", (user) => {
    addUser(user, socket.id);
    io.emit("getUsers", users);
  });

  // send and get message
  socket.on("sendMessage", ({ senderusername, receiverusername, text }) => {
    const user = getUser(receiverusername);
    try {
      io.to(user.socketId).emit("getMessage", {
        senderusername,
        text,
      });
    } catch (e) {}
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

module.exports = app;
