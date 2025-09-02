import app from './app.js';
import serverConfig from './config/serverConfig.js';
import initializeSocketServer from './utils/socket.js';

const { server } = initializeSocketServer(app);

server.listen(serverConfig.PORT, () => {
  console.log(`Server is running on port ${serverConfig.PORT}`);
});
