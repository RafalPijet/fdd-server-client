import * as socketIO from 'socket.io';
import * as http from 'http';

export class IOSocket {
    private io: socketIO.Server;
    constructor(server: http.Server) {
        this.io = new socketIO.Server(server, { cors: { origin: '*' } })
    }
    getIO() {
        return this.io;
    }
}