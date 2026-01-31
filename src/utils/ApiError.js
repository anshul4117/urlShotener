class ApiError extends Error {
    constructor(
        statuscode,
        message,
        errors = [],
        stack = ""
    ) {
        super(message);
        this.message = message;
        this.statuscode = statuscode;
        this.success = false;
        this.errors = errors;
        this.data = null;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export { ApiError };
