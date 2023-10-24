require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const router = require("./routes");

const notFoundMiddleware = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(morgan("dev"));
app.use(cors());

app.use("/api", router());

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(3000, () => {
  mongoose
    .connect(process.env.CONNECTION_MONGODB)
    .then(() => console.log("DB Connected!"));
  console.log(`Server is running on http://localhost:3000`);
});
