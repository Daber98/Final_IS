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

// CORS configuration
const allowedOrigins = [
	'http://shoppr-web-alb-1430224941.us-east-1.elb.amazonaws.com',
	'http://shoppr-web-alb-1430224941.us-east-1.elb.amazonaws.com'
  ];
  
  app.use(cors({
	origin: function (origin, callback) {
	  // Allow requests with no origin
	  // (like mobile apps or curl requests)
	  if (!origin) return callback(null, true);
	  if (allowedOrigins.indexOf(origin) === -1) {
		const msg = 'The CORS policy for this site does not allow access from the specified origin.';
		return callback(new Error(msg), false);
	  }
	  return callback(null, true);
	},
	credentials: true
  }));

app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

// routes
app.use("/api/cruds", crudRoutes);

// listening on port
const port = 4000
app.listen(port, () => console.log(`Listening on port ${port}...`));