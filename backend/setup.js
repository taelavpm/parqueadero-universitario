import connection from './db.js';

connection.query(`CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  uid_firebase VARCHAR(255) UNIQUE,
  nombre VARCHAR(255),
  email VARCHAR(255)
)`, (err) => {
  if (err) console.error('Error creando tabla users:', err);
  else console.log('Tabla users creada o ya existe');
});

connection.query(`CREATE TABLE IF NOT EXISTS reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  tipoVehiculo VARCHAR(50),
  placa VARCHAR(10),
  fecha DATETIME,
  duracion INT,
  estado VARCHAR(50) DEFAULT 'Activa',
  FOREIGN KEY (user_id) REFERENCES users(id)
)`, (err) => {
  if (err) console.error('Error creando tabla reservas:', err);
  else console.log('Tabla reservas creada o ya existe');
});
