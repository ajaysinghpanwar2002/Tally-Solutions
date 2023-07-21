import { prisma } from '../prisma/index.js'

async function createPrivateLobby(req, res) {
    try {
        const newLobby = await prisma.Lobby.create({ data: req.body });
        res.json(newLobby.id);
    } catch (error) {
        console.error(error);
    }
}

async function getPublicLobby(req, res) {
    try {
        const { modes, lobbyType } = req.query;
        console.log('modes:', modes);
        console.log('lobbyType:', lobbyType);

        const publicLobbies = await prisma.lobby.findMany({
            where: {
                AND: [
                    { modes: modes },
                    { lobbyType: lobbyType }
                ]
            },
        });

        res.json(publicLobbies);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching public lobbies.' });
    }
}


export { createPrivateLobby, getPublicLobby };