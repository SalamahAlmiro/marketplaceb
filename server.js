require('dotenv').config();

const db = require('./config/db');
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

app.get('/health', async (req, res) => {
  try {
    await db.promise().query('SELECT 1');
    res.sendStatus(200);
  } catch (err) {
    console.error('Database health check failed:', err);
    res.sendStatus(503);
  }
});

const PORT = 5001;
server.listen(PORT, () => {
    console.log('\x1b[36m%s\x1b[0m', 'Server is running on http://localhost:5001');
});