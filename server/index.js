import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const __dirname = path.resolve();

// Routes
import ServiceRouter from "./routes/ServiceRouter.js";
app.use("/", ServiceRouter);

import UserRouter from "./routes/UserRouter.js";
app.use("/users", UserRouter);

import LobbyRouter from './routes/LobbyRouter.js';
app.use("/lobby", LobbyRouter);

const port = process.env.PORT || 3001;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected.');

    socket.on('ProgressUpdate', (data) => {
        console.log(`Received progress update: ${data.progress}`);
        socket.to(data.roomid).emit("recieved_progress", data.progress);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected.');
        const rooms = io.sockets.adapter.rooms;
        rooms.forEach((room) => {
            if (room.has(socket.id)) {
                const userCount = room.size - 1;
                io.to(room).emit('updateUserCount', userCount);
            }
        });
    });

    socket.on("join_rooom", (data) => {
        socket.join(data);
        const roomUsers = io.sockets.adapter.rooms.get(data);
        const userCount = roomUsers ? roomUsers.size : 0;
        io.to(data).emit('updateUserCount', userCount);
    })
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
