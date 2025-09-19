const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'LifeSync'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL as ID ' + db.threadId);
});

module.exports = db;
