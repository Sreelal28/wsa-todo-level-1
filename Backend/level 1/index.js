import express from "express";
import db from "./utils/db.js";
import "dotenv/config";
import router from "./routes/taskRoute.js";
import cors from "cors";
const app = express();
const port = process.env.PORT || 8001;

app.use(cors());
app.use(express.urlencoded({ extended: true })); //parse the post request coming from req.body
app.use(express.json()); // Accept the json data from front end
//connect database
db();

app.use("/api/v1", router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}...😊`);
});
