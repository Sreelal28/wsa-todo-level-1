import mongoose from "mongoose";
import "dotenv/config";

const db = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully...😊"))
    .catch((err) => console.error("Error While Connecting MongoDB"));
};
export default db;
