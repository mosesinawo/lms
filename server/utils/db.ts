import mongoose from "mongoose"
require("dotenv").config();

const dbUrl:string = process.env.DB_URI || '';

const connectDB = async () =>{
    try {
        await mongoose.connect(dbUrl).then((data:any) =>{
            console.log(`Database connected with ${data.connection.host }`);
        });

    } catch (error:any) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // await new Promise(resolve => setTimeout(resolve, 5000)); // wait 5 seconds before retrying
        setTimeout(() => {
            connectDB()
        }, 5000);
        process.exit(1);
    }
}

export default connectDB;