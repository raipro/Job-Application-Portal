const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicationSchema = new Schema({
	jobid: {
		type: mongoose.Schema.ObjectId,
		required:true
	},
	name: {
		type: String,
		required: true
    },
    useremail: {
        type: String,
        required: true
    },
    recemail: {
        type:String,
        required: true
    },
    skills: {
        type:String,
        required: true
    },
	stageofapplication: {
		type: String,
		default: 'applied'
	},
	applicationdate: {
    		type: Date,
    		default: Date.now
  	},
	rating: {
		type: Number,
		default: 0
	},
	SOP: {
		type: String,
		required: false
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
],
	joiningdate: {
		type: Date,
	    default: '0000-01-01T00:00:00.173Z'
	},
	JobTitle: {
		type: String,
        required: true
	},
	salary: {
		type: Number,
		required: true
	},
	recname: {
		type: String,
		required: true
	},
	ratingjob: {
		type: String,
		default: 0
	},
	jobtype: {
		type: String,
		required:true
	},
	recrating: {
		type: Number,
		default: 0
	}
});

module.exports = Application = mongoose.model("Applications", ApplicationSchema);