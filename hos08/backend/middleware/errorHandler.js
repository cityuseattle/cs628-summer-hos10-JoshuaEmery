//This allows us to customize the error handling
//in this case we will include a stacktrace in the
//error message when something goes wrong
//with the API. We will only include this when
//in development mode.

const errorHandler = (err, req, res, next) => {
  //500 is a server error
  const status = res.statusCode ? res.statusCode : 500;
  res.status(status);
  res.json({
    message: err.message,
    //include a stack trace if we are in development mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
