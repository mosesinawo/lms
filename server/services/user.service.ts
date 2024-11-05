// get user by id

import { NextFunction, Response } from "express";
import User from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";

export const getUserById = async (id: string, res: Response) => {
  const userRedis = await redis.get(id);
  if (userRedis) {
    const user = JSON.parse(userRedis);
    res.status(201).json({
      success: true,
      user,
    });
  }
  //   const user = await User.findById(id);
  //   if (!user) {
  //     return next(new ErrorHandler("User not found", 404));
  //   }
};
