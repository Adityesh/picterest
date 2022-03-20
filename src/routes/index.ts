import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
import * as authController from "../controllers/auth";
import * as pinController from "../controllers/pin";
import * as accountController from "../controllers/account";

export const index = Router();

// Auth routes
index.post("/auth/register", authController.register);
index.post("/auth/login", authController.login);

// Pin routes
index.post("/pin/add", verifyToken, pinController.addPin);
index.delete("/pin/delete", verifyToken, pinController.deletePin);
index.post("/pin/like", verifyToken, pinController.likePin);

// Account routes
index.delete("/account/delete", verifyToken, accountController.deleteAccount);
index.get("/account/get", verifyToken, accountController.account);
