import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import * as mongoose from "mongoose";
import { errorMiddleware } from "./middlewares/error-middleware.mjs";
import { rootRouter } from "./router/index.mjs";

config();

const PORT = process.env.PORT || 5500;
const MONGO_USER = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";

const app = express();

app.use(json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(rootRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose
      .connect(
        `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@social-media.raujk7g.mongodb.net/?retryWrites=true&w=majority`
      )
      .then(() => {
        console.log(`SUCCESSFULLY CONNECTED TO MONGO DATABASE`);
      });
    app.listen(PORT, () => {
      console.log(`SERVER SUCCESSFULLY STARTED ON ${PORT}`);
    });
  } catch (err) {
    console.log(`ERROR WHEN SERVER STARTING - ${err}`);
  }
};

start();
