"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CREATE CONNECTION WITH MONGODB DATABASE
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
const socketio_1 = require("./app/lib/socketIo/socketio");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            yield mongoose_1.default.connect(`${process.env.DATABASE_URL}`); // Get database url from environment variable
            console.log('MongoDB Connected Successfully.');
            // Create the HTTP server
            const server = (0, http_1.createServer)(app_1.default);
            // Initialize socket.io
            (0, socketio_1.initializeSocket)(server);
            // Start the server
            const PORT = process.env.PORT || 5000;
            server.listen(PORT, () => {
                console.log(`Server listening on port http://localhost:${PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main(); //calling the main method to initialize
