export class AppError extends Error {
  public constructor(
    message: string,
    public readonly statusCode: number,
    public readonly code: string,
    public readonly details?: unknown,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class NotFoundError extends AppError {
  public constructor(resource: string) {
    super(`${resource} was not found`, 404, 'NOT_FOUND')
  }
}
