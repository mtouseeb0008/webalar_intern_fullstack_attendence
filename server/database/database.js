import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected to ${connection.host}`);
    return mongoose;
  } catch (error) {
    console.log(error);
    return error;
  }
};
