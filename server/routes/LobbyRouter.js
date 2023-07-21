import express from 'express';
const LobbyRouter = express.Router();
import { createPrivateLobby, getPublicLobby } from "../controllers/LobbyController.js"

LobbyRouter.post('/private', createPrivateLobby);
LobbyRouter.get('/getpublic', getPublicLobby);
export default LobbyRouter;  