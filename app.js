const express = require('express');
const cors = require('cors');
const router = require('./api/router');

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  req.io = req.app.get('io');
  next();
});
app.use('/api', router);

module.exports = app;