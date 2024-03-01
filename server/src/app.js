import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16KB" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kB",
  })
);
app.use(express.static("public"));
app.use(cookieParser());

//! Router Import
import userRouter from "./routes/user.routes.js";
import candidateRouter from "./routes/candidate.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/candidates", candidateRouter);

export { app };

//* For testing purposes
// app.get("/", (req, res) => {
//   res.send("hello Ruturaj");
// });
