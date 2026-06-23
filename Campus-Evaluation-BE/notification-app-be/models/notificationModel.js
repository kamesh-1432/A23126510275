import db from '../config/dbConfig.js';

export const createNotificationRecord = (id, type, title, message, createdAt) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO notifications (id, type, title, message, createdAt) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [id, type, title, message, createdAt], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export const fetchUnreadNotifications = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM notifications WHERE isRead = 0`;
    db.all(query, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};