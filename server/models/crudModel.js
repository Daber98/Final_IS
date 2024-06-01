const mongoose = require("mongoose");

const crudSchema = new mongoose.Schema({
	companyName: {
		type: String,
	},
	phone: {
		type: String,
	},
	email: {
		type: String,
	},
	location: {
		type: String,
	},
	link: {
		type: String,
	},
	description: {
		type: String,
	},
});

module.exports = mongoose.model("Crud", crudSchema, "Crud");
