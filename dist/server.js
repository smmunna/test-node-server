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
const config_1 = __importDefault(require("./app/config"));
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            yield mongoose_1.default.connect(`${config_1.default.mongodbUrl}`); // Get database url from environment variable
            console.log(`${COLORS.cyan}${COLORS.bright}MongoDB Connected Successfully.`);
            // Create the HTTP server
            const server = (0, http_1.createServer)(app_1.default);
            // Initialize socket.io, broadcasting to all connected browsers
            // initializeSocket(server)
            //Room socket configuration, only connected rooms are broadcasting
            // roomSocketConfiguration(server)
            // Start the server
            server.listen(config_1.default.port, () => {
                console.log(`Server listening on port ${COLORS.underscore}http://localhost:${config_1.default.port}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main(); //calling the main method to initialize
