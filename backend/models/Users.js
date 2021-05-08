const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicantSchema = new Schema({
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
	rating: {
		type: Number,
		default: 0
	},
	skills: {
		type: String,
		required: true
	},
	education: [
		{
    InstitutionName: {
		type: String,
		required: false
	},
	StartYear: {
		type: String,
		required: false
	},
    EndYear: {
		type: String,
		required: false
	}
}
	 ]	 
});

module.exports = User = mongoose.model("Users", ApplicantSchema);
