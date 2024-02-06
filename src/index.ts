import express from "express";
import { environments } from "./config/environment";
import indexRouter from "./routes";
import morgan from "morgan";
import cors from "cors";

const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use("/api", indexRouter);

server.listen(environments.PORT, () => {
  console.log(`====> SERVER LISTENING ON PORT ${environments.PORT}`);
});
