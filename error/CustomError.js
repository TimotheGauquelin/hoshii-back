class CustomError extends Error {
    constructor(error) {
      super();
      this.error = error;
    }
  }
  
export default CustomError