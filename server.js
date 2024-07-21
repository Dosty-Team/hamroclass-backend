const express = require("express");
const app = express();
const http = require('http');
const mongoose = require("mongoose");
const authRoute = require("./routers/auth");
const productRoute = require("./routers/product");
const categoriesRoute = require("./routers/categories");
const socketIo = require('socket.io');
const server = http.createServer(app);

const cors = require("cors");
const semesterRouter = require('./routers/Semester');
const holidaysRoute = require('./routers/holidays');
const syllabusRoutes = require("./routers/Syllabuls");
const addteacherRoutes = require("./routers/Teacher");
const notificationsRouter = require("./routers/notification");
app.use(cors());
app.use(express.json());

const io = socketIo(server, {
  cors: {
      origin: '*',
      methods: ['GET', 'POST']
  }
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });
});

global.io = io; //

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/syllanalysis")
  .then(() => {
    console.log("Connected to database");
    startServer();
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

function startServer() {
  // Assuming authRoute and productRoute are instances of Express Routers
  app.use("/v1", authRoute);
  app.use("/v1", productRoute);
  app.use("/v1", categoriesRoute);
  app.use('/v1', semesterRouter);
  app.use('/v1', holidaysRoute);
  app.use('/v1', syllabusRoutes);
  app.use('/v1', addteacherRoutes);
  app.use('/v1', notificationsRouter);

  server.listen(5000, () => {
    console.log("Backend running on port 5000");
  });
}
