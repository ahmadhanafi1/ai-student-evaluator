const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Student = require('../models/studentModel');

exports.evaluate = catchAsync(async (req, res, next) => {
	const student = await Student.findById(req.params.id);
	if (!student) {
		return next(new AppError('No student found with that ID', 404));
	}
	if (student?.skills.length < 1) {
		return next(new AppError('Student Does not have skills in the database. Update it with the skills and try again.', 400));
	}
	const studentSkills = student.skills.join(', ');
		
	const response = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${procee.env.OPENAI_API_KEY}`,
			"Content-Type": "application/json",
		},
		body:  JSON.stringify({
			"model": "gpt-3.5-turbo",
			"messages": [
			  {
				"role": "system",
				"content": `You are a professional teacher who is well versed in ${req.body.subject}. You are tasked with evaluationg students knowledge in ${req.body.subject} on a scale from 1 to 10`
			  },
			  {
				"role": "user",
				"content": `You are tasked with judging a student in the ${req.body.subject} subject. The student's skills and knowledge are as follows: ${studentSkills}. I want you to judge the the sudent's level of knowledge about ${req.body.subject} The only answers that apply are numeral answers from 1 to 10, meaning 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. If the answer is not very clear, choose the nearest option.Limit your answer to one number only. either 1, 2, 3, 4 ,5 ,6 ,7 ,8 ,9 or 10. Don't explain anything. don't say anything else. just one number. And you have to answer even if the result is not clear.`
			  }
			]
		})
	})
	const data = await response.json()
	console.log(data)
	if (data?.choices?.length < 1) {
		return next(new AppError('An error occured with the openAI API. Make sure you entered a valid api key in config.env', 500));
	} else {
		res.status(201).json({
			status: 'success',
			data: {
			  reply: data.choices[0].message
			}
		  });
	}
})

