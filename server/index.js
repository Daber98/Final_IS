require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const crudRoutes = require("./routes/crudRoutes");

const app = express();

// database connection
connection();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  origin: 'http://shoppr-web-alb-108717195.us-east-1.elb.amazonaws.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.use("/api/cruds", crudRoutes);

// listening on port
const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
