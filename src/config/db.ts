import dotenv from "dotenv";
import mongoose from "mongoose";
import colors from "colors";
dotenv.config();

/**
 * Connects the app to MongoDB using environment variables
 */
export const connectBD = async () => {
  try {
    const url: string | undefined = process.env.MONGODB_URI;
    const database: string = process.env.MONGODB_DATABASE ?? "linktree";
    if (!url) {
      throw new Error("MONGODB_URI is not defined");
    }
    const connection = await mongoose.connect(url, { dbName: database });
    const url2 = `${connection.connection.host}:${connection.connection.port}`;
    console.log(colors.bgWhite.cyan("It is connected"), url2);
  } catch (error) {
    console.log(colors.bgRed.white.bold(error));
    process.exit(1);
  }
};
