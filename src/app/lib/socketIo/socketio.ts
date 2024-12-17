import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export const initializeSocket = (server: HttpServer) => {
    const io = new Server(server, {
        cors: {
            origin: '*', // Allow any origin for now. Change this for production.
            methods: ['GET', 'POST'],
        },
    });

    // Handle socket connection
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Event for receiving messages
        socket.on('sendMsg', (msg) => {
            console.log('Received message:', msg);
            io.emit('rcvMsg', msg); // Broadcast the message to all connected clients
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    console.log('Socket.io initialized.');
};
