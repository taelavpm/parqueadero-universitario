import connection from './db.js';

connection.query('INSERT INTO users (uid_firebase, nombre, email) VALUES (?, ?, ?)', ['test-uid', 'Test User', 'test@example.com'], (err, result) => {
  if (err) console.error('Error insertando usuario:', err);
  else console.log('Usuario insertado con ID:', result.insertId);
  connection.end();
});
