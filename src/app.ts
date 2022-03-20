import express from "express";
import logger from "morgan";
import * as path from "path";
import cors from 'cors';
import connect from "./db";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import { index } from "./routes/index";
// Create Express server
export const app = express();

// Db connection
connect();


// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api", index);

app.use(errorNotFoundHandler);
app.use(errorHandler);
