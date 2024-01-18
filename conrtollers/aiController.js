const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// const AI = require('../models/aiModel')



exports.evaluation = catchAsync(async (req, res, next) => {
	const apiOptions = {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
				"Content-Type": "application/json",

			},
		body: JSON.stringify({
				model: "gpt-3.5-turbo",
				messages: [{role: "user", content: "", }],
			})
		}

})

