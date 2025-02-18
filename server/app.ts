import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
export const app = express();
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";

//body parser
// app.use(express.json({limit:"50mb"}))
app.use(express.json());

//cookie parser
app.use(cookieParser());

//cors

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// routes
app.use("/api/v1", userRouter);
app.use("/api/v1/", courseRouter);

app.get("/test/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working 🚀",
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found 😓`) as any;
  err.status = 404;
  next(err);
});

app.use(ErrorMiddleware);
