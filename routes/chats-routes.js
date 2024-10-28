import express from "express";
import * as chatsController from "../controllers/chats-controller.js";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const router = express.Router();
router.route("/:id").get(chatsController.getChats);

router.route("/:id/:friendId").post(chatsController.postMessage);

router.route("/:id/:friendId").get(chatsController.getChat);

export default router;
