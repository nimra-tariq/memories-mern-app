import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";
const app = express();
//https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
//bodyParser parse the incoming reqs body and attach it to req.body
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
dotenv.config();
//handle cross origin requests preflight requests on other domains
//https://stackoverflow.com/questions/46024363/what-does-app-usecors-do#:~:text=What%20it%20really%20does,request%20options%20the%20server%20accepts.
app.use(cors());

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connected at port ${PORT}`);
    });
  })
  .catch((error) => console.log(error.message, "connection error"));

//all routes for post will be starting from /posts/*
app.use("/posts", postRoutes);
