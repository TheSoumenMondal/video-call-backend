import express from 'express';
import authRouter from './authRouter.js';
import meetingRoutes from './meetingRoutes.js';

const v1Router = express.Router();

v1Router.use("/auth", authRouter);
v1Router.use("/meetings", meetingRoutes);

export default v1Router;
