export class HttpError extends Error {
  name = null
  code = null
  message = null

  constructor(
    name,
    code,
    message,
  ) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    this.code = code
    this.message = message
    Error.captureStackTrace(this)
  }
}

export class HttpBadRequestError extends HttpError {
  constructor(message) {
    super("Bad Request", 400, message)
  }
}

export class HttpNotFoundError extends HttpError {
  constructor(message) {
    super("Not Found", 404, message)
  }
}

export class HttpInternalServerError extends HttpError {
  constructor(message) {
    super("Internal Server", 500, message)
  }
}