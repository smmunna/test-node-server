import app from './app';
import { createServer } from 'http';
import {
  initializeSocket,
  roomSocketConfiguration,
} from './app/utils/socketIo/socketio';
import config from './app/config';


async function main() {
  try {
    // Connect to MongoDB
    await config.connectMongoDB();

    // Create the HTTP server
    const server = createServer(app);

    // Initialize socket.io, broadcasting to all connected browsers
    // initializeSocket(server)

    //Room socket configuration, only connected rooms are broadcasting
    // roomSocketConfiguration(server)

    // Start the server
    server.listen(config.port, () => {
      console.log(`Server listening on port http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main(); //calling the main method to initialize
