import express from 'express';
import authRouter from './authRouter.js';

const v1Router = express.Router();

v1Router.use("/auth", authRouter);

export default v1Router;
