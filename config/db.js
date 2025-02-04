const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',  
    user: 'root',       
    password: '=-120934s', 
    database: 'marketplace',  
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


pool.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);  
    } else {
        console.log("Connected to MySQL!");
        connection.release();  
    }
});

module.exports = pool;
