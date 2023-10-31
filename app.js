require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const port = process.env.PORT || 3000;

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

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API GoIT",
      version: "1.0.0",
      description:
        "This is a API REST app made with Express. It controls the info about API GoIT.",
    },
    servers: [
      {
        url: `http://127.0.0.1:${port}`,
        description: "Local server",
      },
      {
        url: `https://remisiones-production.up.railway.app`,
        description: "Production server",
      },
    ],
  },
  apis: [
    process.cwd() + "/routes/*.js",
    process.cwd() + "/models/*.js",
    process.cwd() + "/schemas.js"
  ],
};

const apiSpecification = swaggerJSDOC(swaggerOptions);
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(apiSpecification));


app.use("/api", router());

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  mongoose
    .connect(process.env.CONNECTION_MONGODB)
    .then(() => console.log("DB Connected!"));
  console.log(`Server is running on http://localhost:${port}`);
});
