import { Router } from "express";
import { postChatMessage } from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.post("/", postChatMessage);

export default chatRouter;
