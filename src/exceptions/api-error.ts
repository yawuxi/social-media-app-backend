export class ApiError extends Error {
  status: number;
  errors;

  constructor(status: number, message: string, errors?: []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message = "Server error", errors: [] = []) {
    return new ApiError(500, message, errors);
  }

  static UnauthorizedError() {
    return new ApiError(401, "Unathorized error");
  }
}
