const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "A student must have a name"]
	},
	skills: {
		type: [String],

	}
},
{
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
})


module.exports = mongoose.model("Student", studentSchema)