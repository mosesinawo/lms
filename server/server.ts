import { app } from "./app";
import connectDB from "./utils/db";
import {v2 as cloudinary} from "cloudinary"
require("dotenv").config();

//cloudinary config

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const PORT = process.env.PORT || 3000;

//create server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB()
});
