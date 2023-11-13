require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const multer  = require('multer')
const { v4: uuid } = require("uuid")
const path = require("path")

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

// Config multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "/uploads"),
  filename: (req, file, cb) => {
      cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
  }
})

/* app.use(multer({ 
  storage,
  dest: path.join(__dirname, "../uploads"),
  fileFilter: (req, file, cb) => {
    const filetypes = /jpg|jpeg|png|gif/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())

    if (mimetype && extname) {
      cb(null, true)
    } else {
      cb(new Error("It must be a valid ext."))
    }
  },
  limits: 5 * 1024 * 1024
}).single("photo")) */

app.use(express.static(path.join(__dirname, "/uploads")))

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
