const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./conrtollers/errorController');
const aiRouter = require("./routes/aiRouter");

const app = express();

app.use(morgan('dev'));
app.use(express.json())
app.use(express.static(`${__dirname}/public`));


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.use('/api/v1/ai', aiRouter);
module.exports = app;