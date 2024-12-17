import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

// One to one message socket configuration, connected all devices all get messages
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

// Room-based group messaging socket configuration
export const roomSocketConfiguration = (server: HttpServer) => {
    const io = new Server(server, {
        cors: {
            origin: '*', // Allow any origin for now. Update in production.
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('User connected to room socket:', socket.id);

        // Join a room
        socket.on('joinRoom', (roomName) => {
            if (roomName?.trim()) {
                socket.join(roomName);
                console.log(`User ${socket.id} joined room: ${roomName}`);
                io.to(roomName).emit('roomMessage', { userId: 'System', text: `${socket.id} has joined the room`, room: roomName });
            }
        });

        // Leave a room
        socket.on('leaveRoom', (roomName) => {
            if (roomName?.trim()) {
                socket.leave(roomName);
                console.log(`User ${socket.id} left room: ${roomName}`);
                io.to(roomName).emit('roomMessage', { userId: 'System', text: `${socket.id} has left the room`, room: roomName });
            }
        });

        // Send a message to a specific room
        socket.on('sendRoomMsg', ({ roomName, message }) => {
            // Validate roomName and message format
            if (roomName?.trim() && message?.userId && message?.text) {
                console.log(`Message to room ${roomName} from ${socket.id}:`, message);
                io.to(roomName).emit('roomMessage', message); // Broadcast to the room
            } else {
                console.error('Invalid message format:', { roomName, message });
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected from room socket:', socket.id);
        });
    });

    console.log('Room-based Socket.io initialized.');
};