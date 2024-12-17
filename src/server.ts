//CREATE CONNECTION WITH MONGODB DATABASE
import mongoose from 'mongoose';
import app from './app'
import { createServer } from 'http';
import { initializeSocket, roomSocketConfiguration } from './app/utils/socketIo/socketio';

async function main() {
    try {

        // Connect to MongoDB
        await mongoose.connect(`${process.env.DATABASE_URL}`) // Get database url from environment variable
        console.log('MongoDB Connected Successfully.');

        // Create the HTTP server
        const server = createServer(app)

        // Initialize socket.io, broadcasting to all connected browsers
        // initializeSocket(server)

        //Room socket configuration, only connected rooms are broadcasting
        roomSocketConfiguration(server)

        // Start the server
        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => {
            console.log(`Server listening on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

main()  //calling the main method to initialize