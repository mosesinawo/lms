import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid:${err.path}`;
    err = new ErrorHandler(message, 400);
   
  }

  //Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate field value entered. Please use unique value for ${err.keyValue}`;
    err = new ErrorHandler(message, 400);
  }

  //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid token. Please login again`;
    err = new ErrorHandler(message, 401);
  }

  //wrong refresh token error
  if (err.name === "TokenExpiredError") {
    const message = `Refresh token expired. Please login again`;
    err = new ErrorHandler(message, 401);
  }

  //wrong password error
  if (err.message === "Incorrect password") {
    const message = `Incorrect password. Please try again`;
    err = new ErrorHandler(message, 401);
  }

  //wrong email error
  if (err.message === "Email already exists") {
    const message = `Email already exists. Please use a different email`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};
