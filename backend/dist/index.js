"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(function (request, response) {
    console.log(new Date() + " Received request for " + request.url);
    response.end("hi there");
});
const wss = new ws_1.WebSocketServer({ server });
wss.on("connection", function connection(socket) {
    socket.on("error", console.error);
    socket.on("message", function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            //   if (client.readyState === WebSocket.OPEN) {
            client.send(data, { binary: isBinary });
            //   }
        });
    });
    socket.send("Hello! Message From Server!!");
});
server.listen(8080, function () {
    console.log(new Date() + " Server is listening on port 8080");
});
