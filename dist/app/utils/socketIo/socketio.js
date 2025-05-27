"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomSocketConfiguration = exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
// One to one message socket configuration, connected all devices all get messages
const initializeSocket = (server) => {
    const io = new socket_io_1.Server(server, {
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
exports.initializeSocket = initializeSocket;
// Room-based group messaging socket configuration
const roomSocketConfiguration = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: '*', // Allow any origin for now. Update in production.
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => {
        console.log('User connected to room socket:', socket.id);
        // Join a room
        socket.on('joinRoom', (roomName) => {
            if (roomName === null || roomName === void 0 ? void 0 : roomName.trim()) {
                socket.join(roomName);
                console.log(`User ${socket.id} joined room: ${roomName}`);
                io.to(roomName).emit('roomMessage', {
                    userId: 'System',
                    text: `${socket.id} has joined the room`,
                    room: roomName,
                });
            }
        });
        // Leave a room
        socket.on('leaveRoom', (roomName) => {
            if (roomName === null || roomName === void 0 ? void 0 : roomName.trim()) {
                socket.leave(roomName);
                console.log(`User ${socket.id} left room: ${roomName}`);
                io.to(roomName).emit('roomMessage', {
                    userId: 'System',
                    text: `${socket.id} has left the room`,
                    room: roomName,
                });
            }
        });
        // Send a message to a specific room
        socket.on('sendRoomMsg', ({ roomName, message }) => {
            // Validate roomName and message format
            if ((roomName === null || roomName === void 0 ? void 0 : roomName.trim()) && (message === null || message === void 0 ? void 0 : message.userId) && (message === null || message === void 0 ? void 0 : message.text)) {
                console.log(`Message to room ${roomName} from ${socket.id}:`, message);
                io.to(roomName).emit('roomMessage', message); // Broadcast to the room
            }
            else {
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
exports.roomSocketConfiguration = roomSocketConfiguration;
