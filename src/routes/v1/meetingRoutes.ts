import express from 'express';
import authMiddleware from '../../middleware/auth.middleware.js';
const meetingRoutes = express.Router();

meetingRoutes.use(authMiddleware);



export default meetingRoutes;
