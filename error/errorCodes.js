const INVALID_EMAIL_OR_PASSWORD = {
      statusCode: 400, // Bad Request
      message: 'Invalid email address or password',
    }

const WRONG_LOG = {
      statusCode: 401, // Bad Request
      message: 'Invalid username or password',
    }

const JOI_VALIDATE_ERROR = (errorMessage) => {
      return (
        {statusCode: 400,
        message: errorMessage}
      )
}  

const USER_NOT_FOUND = {
      statusCode: 400, // Not Found
      message: 'User not found',
    }

const DATA_IS_ALREADY_USED = {
      statusCode: 409, // Not Found
      message: 'User not found',
}  

const INTERNAL_ERROR = {
      statusCode: 500, // Internal Server Error
      message: 'Internal Server Error',
    }

export default { INVALID_EMAIL_OR_PASSWORD, WRONG_LOG, USER_NOT_FOUND, DATA_IS_ALREADY_USED, JOI_VALIDATE_ERROR, INTERNAL_ERROR }