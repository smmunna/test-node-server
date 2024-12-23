//CREATE CONNECTION WITH MONGODB DATABASE
import mongoose from 'mongoose';
import app from './app';
import { createServer } from 'http';
import {
  initializeSocket,
  roomSocketConfiguration,
} from './app/utils/socketIo/socketio';
import config from './app/config';

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${config.mongodbUrl}`); // Get database url from environment variable
    console.log(`MongoDB Connected Successfully.`);

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
