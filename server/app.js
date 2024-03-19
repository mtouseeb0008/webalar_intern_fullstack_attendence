import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

connectDB();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import Routers
import userRouter from "./routes/user.js";
import { connectDB } from "./database/database.js";
app.use("/api/v1", userRouter);

app.get("/", (req, res, next) => {
  res.send("Welcome to Attenance Portal Server");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 8000");
});
