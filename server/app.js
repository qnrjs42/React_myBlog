import express from "express";
import mongoose from "mongoose";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import config from "./config";

//Routers
import postsRoutes from "./routes/api/post";

const app = express();
const { MONGO_URI } = config;

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
  })
  .then(() => console.log("MongoDB connecting Success!!"))
  .catch((e) => console.log(e));

// Use Routes
app.get("/");
app.use("/api/post", postsRoutes); // 해당 경로의 router.post('/')으로 이동

export default app;
