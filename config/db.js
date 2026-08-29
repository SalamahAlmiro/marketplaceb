require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'marketplace',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


pool.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);  
    } else {
        console.log('\x1b[32m%s\x1b[0m' ,"Connected to MySQL");
        connection.release();  
    }
});

module.exports = pool;
