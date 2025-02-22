//INFO_STUDY: Custom error class used to handle errors in a more presonalized manner
//            recieves the usual message and a specified HTTP error code to give more isnights of the error

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;