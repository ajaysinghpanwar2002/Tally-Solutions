import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const __dirname = path.resolve();

// Routes
import ServiceRouter from "./routes/ServiceRouter.js";
app.use("/",ServiceRouter);

import UserRouter from "./routes/UserRouter.js";
app.use("/users",UserRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});