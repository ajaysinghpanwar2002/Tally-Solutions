import express from 'express';
const LobbyRouter = express.Router();
import {createPrivateLobby} from "../controllers/LobbyController.js"

LobbyRouter.post('/private', createPrivateLobby);

export default LobbyRouter;  