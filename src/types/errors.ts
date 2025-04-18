export interface ApiError {
  message: string;
  statusCode: number;
}

export interface ValidationError {
  errors: string[];
}

export type ErrorType = ApiError | ValidationError | Error;