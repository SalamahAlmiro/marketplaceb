require('dotenv').config();

const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    }
  });

app.set('io', io);

io.on('connection', (socket) => {
    console.log('client connected:', socket.id);
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

const PORT = 5001;
server.listen(PORT, () => {
    console.log('\x1b[36m%s\x1b[0m', 'Server is running on http://localhost:5001');
});