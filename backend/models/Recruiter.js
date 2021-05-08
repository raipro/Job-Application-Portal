const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecruiterSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	UserType:{
		type: String,
		required: true
	},
	password: {
    		type: String,
    		required: true
  	},
	contactno: {
		type: Number,
		required: true
	},
    bio: {
		type: String,
		required: true
	},
});

module.exports = Recruiter = mongoose.model("Recruiter", RecruiterSchema);