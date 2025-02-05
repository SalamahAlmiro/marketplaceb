const express = require('express');
const cors = require('cors');
const router = require('./api/router');
let outputColor = "color:green;";

let style = 'background-color:white; border:2px solid green; font-size:18px; font-weight: bold;padding:3px 5px;color:';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

const PORT = 5001;
app.listen(PORT, () => {
    console.log('\x1b[36m%s\x1b[0m', 'Server is running on http://localhost:5001');
});