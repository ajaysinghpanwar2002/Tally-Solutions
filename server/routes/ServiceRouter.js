import express from 'express';
const ServiceRouter = express.Router();
import {ServiceProvider} from "../controllers/ServiceController.js";

ServiceRouter.get('/',ServiceProvider);
export default ServiceRouter;
