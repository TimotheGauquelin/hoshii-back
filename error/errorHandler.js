import errorCodes from './errorCodes.js'

function errorHandler(err, req, res, next) {
    const code = (err && err.statusCode) || null;
    const error = errorCodes[statusCode] || errorCodes['INTERNAL_ERROR'];
  
    return res
      .status(code)
      .json({ message: error.message });
  };
  
  export default errorHandler;