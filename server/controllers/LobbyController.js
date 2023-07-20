import { prisma } from '../prisma/index.js'

async function createPrivateLobby(req, res) {
    try {
        const newLobby = await prisma.Lobby.create({ data: req.body });
        res.json(newLobby.id);
    } catch (error) {
        console.error(error);
    }
}

export { createPrivateLobby };