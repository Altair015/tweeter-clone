import mongoose from "mongoose";

const connectDB = async () => {
  const { MONGO_CONNECTION_URI } = process.env;
  try {
    const connection = await mongoose.connect(MONGO_CONNECTION_URI);
    console.log(connection.connection.host);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
