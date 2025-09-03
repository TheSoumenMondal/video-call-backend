import express from 'express';
import apiRouter from './routes/index.js';
import errorHandler from './utils/errorHandler.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.use(errorHandler);

export default app;
