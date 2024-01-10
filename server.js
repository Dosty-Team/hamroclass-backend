const express = require("express");
const app = express();

const mongoose = require("mongoose");
const authRoute = require("./routers/auth");
const productRoute = require("./routers/product");
const categoriesRoute = require("./routers/categories");
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/inventory")
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
  app.use("/v1",categoriesRoute);

  app.listen(5000, () => {
    console.log("Backend running on port 5000");
  });
}
