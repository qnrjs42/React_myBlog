import express from "express";
import mongoose from "mongoose";
import config from "./config";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import path from "path";

//Routers
import postRoutes from "./routes/api/post";
import userRoutes from "./routes/api/user";
import authRoutes from "./routes/api/auth";

import morgan from "morgan";

const app = express();
const { MONGO_URI } = config;

const prod = process.env.NODE_ENV === "production";

// 서버 보안 라이브러리
app.use(hpp());
app.use(helmet());

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connecting Success!!"))
  .catch((e) => console.log(e));

// Use Routes
app.use("/api/post", postRoutes); // 해당 경로의 router.post('/')으로 이동
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

export default app;
