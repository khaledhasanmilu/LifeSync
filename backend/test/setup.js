const mysql = require('mysql2');

module.exports = async () => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    multipleStatements: true,
  });

  db.connect();

  return new Promise((resolve, reject) => {
    db.query('DROP DATABASE IF EXISTS LifeSync_test', (err) => {
      if (err) {
        console.error('❌ Database drop failed:', err.stack);
        db.end();
        return reject(err);
      }
      console.log('✅ Test database dropped');

      db.query('CREATE DATABASE LifeSync_test', (err) => {
        if (err) {
          console.error('❌ Database creation failed:', err.stack);
          db.end();
          return reject(err);
        }
        console.log('✅ Test database created');

        db.query('USE LifeSync_test', (err) => {
          if (err) {
            console.error('❌ Database selection failed:', err.stack);
            db.end();
            return reject(err);
          }

          const sql = `
            CREATE TABLE user (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(100) NOT NULL,
              email VARCHAR(100) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );

            CREATE TABLE todos (
              id INT AUTO_INCREMENT PRIMARY KEY,
              user_id INT NOT NULL,
              title VARCHAR(255) NOT NULL,
              description TEXT,
              completed BOOLEAN DEFAULT FALSE,
              priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
              due_date DATE,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            );

            CREATE TABLE finance (
              id INT AUTO_INCREMENT PRIMARY KEY,
              user_id INT NOT NULL,
              type ENUM('income', 'expense') NOT NULL,
              amount DECIMAL(10, 2) NOT NULL,
              category VARCHAR(50) NOT NULL,
              description TEXT,
              date DATE NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            );

            CREATE TABLE learning (
              id INT AUTO_INCREMENT PRIMARY KEY,
              user_id INT NOT NULL,
              title VARCHAR(255) NOT NULL,
              description TEXT,
              progress INT DEFAULT 0,
              completed BOOLEAN DEFAULT FALSE,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            );

            CREATE TABLE emergency_contacts (
              id INT AUTO_INCREMENT PRIMARY KEY,
              user_id INT NOT NULL,
              name VARCHAR(100) NOT NULL,
              relationship VARCHAR(50),
              phone VARCHAR(20) NOT NULL,
              email VARCHAR(100),
              address TEXT,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            );

            CREATE TABLE travel_plans (
              id INT AUTO_INCREMENT PRIMARY KEY,
              user_id INT NOT NULL,
              destination VARCHAR(200) NOT NULL,
              start_date DATE NOT NULL,
              end_date DATE NOT NULL,
              budget DECIMAL(10, 2),
              description TEXT,
              status ENUM('planned', 'ongoing', 'completed', 'cancelled') DEFAULT 'planned',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            );

            CREATE TABLE budget (
              id INT AUTO_INCREMENT PRIMARY KEY,
              user_id INT NOT NULL,
              area VARCHAR(100) NOT NULL,
              amount DECIMAL(10, 2) NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            );

            CREATE TABLE tasks (
              id INT AUTO_INCREMENT PRIMARY KEY,
              user_id INT NOT NULL,
              title VARCHAR(255) NOT NULL,
              description TEXT,
              due_date DATE,
              priority VARCHAR(255),
              status VARCHAR(255),
              recurrence VARCHAR(255),
              notes TEXT,
              FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            );

            CREATE TABLE subtask (
              id INT AUTO_INCREMENT PRIMARY KEY,
              task_id INT NOT NULL,
              name VARCHAR(255) NOT NULL,
              FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
            );
          `;

          db.query(sql, (err) => {
            if (err) {
              console.error('❌ Database setup failed:', err.stack);
              db.end();
              return reject(err);
            }
            console.log('✅ Database setup complete');
            db.end();
            resolve();
          });
        });
      });
    });
  });
};