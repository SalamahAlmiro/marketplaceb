require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const router = require('./api/router');
const app = express();
const server = http.createServer(app); 

const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    }
  });

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    req.io = io;
    next();
  });
app.use('/api', router);

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