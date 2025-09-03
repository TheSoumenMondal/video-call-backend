import app from './app.js';
import serverConfig from './config/serverConfig.js';
import initializeSocketServer from './utils/socket.js';
import connectDB from './config/dbConfig.js';

const startServer = async () => {
  connectDB()
    .then(() => {
      const { server } = initializeSocketServer(app);
      server.listen(serverConfig.PORT, () => {
        console.log(`Server is running on port ${serverConfig.PORT}`);
      });
    })
    .catch((error) => {
      console.error('Database connection error:', error);
    });
};


startServer();