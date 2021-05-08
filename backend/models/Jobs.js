const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
	JobTitle: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	applications: {
    	type: Number,
    	required: true
  	},
	positions: {
		type: Number,
		required: true
	},
    skills: {
		type: String,
		required: true
    },
    jobtype: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
    },
    postdate: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        required: true
    },
    rempositions: {
        type: Number,
        required: true
    },
    remapplications: {
        type: Number,
        required: true
    },
});

module.exports = Jobs = mongoose.model("Jobs", JobSchema);