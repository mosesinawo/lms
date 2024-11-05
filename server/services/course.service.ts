import { Request, Response, NextFunction, response } from "express";
import courseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";

//create course

export const createCourse = CatchAsyncError(
  async (data: any, res: Response) => {
    const course = await courseModel.create(data);
    
    res.status(201).json({
      success: true,
      message: "course successfully created",
      course,
    });
  }
);
