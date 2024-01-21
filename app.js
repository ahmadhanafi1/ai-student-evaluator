const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./conrtollers/errorController');
const aiRouter = require("./routes/aiRouter");
const studentRouter = require("./routes/studentRoute");

const app = express();

app.use(morgan('dev'));
app.use(express.json())
app.use(express.static(`${__dirname}/public`));


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/ai', aiRouter);
app.use('/api/v1/student', studentRouter)


app.all('*', (req, res, next) => {
  console.log(req.originalUrl)
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);



module.exports = app;