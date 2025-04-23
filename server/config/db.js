import mongoose from "mongoose";

//Fuction  to connect to the MongoDB database

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));
  await mongoose.connect(`${process.env.MONGODB_URI}/Job_Portal`);
};

export default connectDB;
