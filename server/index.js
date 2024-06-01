require("dotenv").config();
const express = require("express");
const cors = require("cors");
const MongoDBConnection = require("./db");
const crudRoutes = require("./routes/crudRoutes");

const app = express();

// Conexión a la base de datos
MongoDBConnection();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

// Rutas
app.use("/api/cruds", crudRoutes);

// Puerto
const port = 4000
app.listen(port, () => console.log(`Server iniciado en el puerto: ${port}...`));