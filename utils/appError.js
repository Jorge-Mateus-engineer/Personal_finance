//INFO_STUDY: Custom error class used to handle errors in a more presonalized manner
//            recieves the usual message and a specified HTTP error code to give more isnights of the error

class AppError extends Error {
  constructor(message, statusCode) {
    // Call super to send parameters to the parent class
    super(message);

    // Set custom properties
    this.statusCode = statusCode;
    // Status, codes like 4** are failure and other codes are errors
    this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
    // Only errors created by our class will be sent to the client, uknown errors won't have this property
    this.isOperational = true;

    //Used to preserve the .stack property and exclude the AppError class from the stack itself
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;