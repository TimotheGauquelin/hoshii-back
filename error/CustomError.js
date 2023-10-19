class CustomError extends Error {
    constructor(error) {
      super();
      this.name = error.message;
      this.statusCode = error.statusCode
    }
  }
  
export default CustomError