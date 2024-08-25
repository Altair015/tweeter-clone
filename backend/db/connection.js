import mongoose from "mongoose";

const connectDB = async () => {
  const { MONGO_CONNECTION_URI } = process.env;
  try {
    const connection = await mongoose.connect(MONGO_CONNECTION_URI);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
