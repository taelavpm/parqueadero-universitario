import express from "express";
import cors from "cors";
import connection from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Probar que el servidor funciona
app.get("/", (req, res) => {
    res.send("Servidor funcionando ✅");
});

// ✅ Probar conexión a MySQL
connection.connect((error) => {
    if (error) {
        console.error("❌ Error al conectar a MySQL:", error);
        return;
    }
    console.log("✅ Conexión exitosa a MySQL");
});

// Registrar u obtener usuario en MySQL
app.post("/users", (req, res) => {
  const { uid_firebase, nombre, email } = req.body;

  if (!uid_firebase) {
    return res.status(400).json({ error: "Falta uid_firebase" });
  }

  // Verificar si ya existe
  const checkSql = "SELECT id FROM users WHERE uid_firebase = ?";
  connection.query(checkSql, [uid_firebase], (err, rows) => {
    if (err) {
      console.error("❌ Error al verificar usuario:", err);
      return res.status(500).json({ error: "Error al verificar usuario" });
    }

    if (rows.length > 0) {
      // Ya existe, devolver id
      res.json({ id: rows[0].id });
    } else {
      // Insertar nuevo
      const insertSql = "INSERT INTO users (uid_firebase, nombre, email) VALUES (?, ?, ?)";
      connection.query(insertSql, [uid_firebase, nombre, email], (err, result) => {
        if (err) {
          console.error("❌ Error al insertar usuario:", err);
          return res.status(500).json({ error: "Error al registrar usuario" });
        }
        res.json({ id: result.insertId });
      });
    }
  });
});
// Ruta para insertar reserva en MySQL
app.post("/reservas", (req, res) => {
  const { user_id, tipoVehiculo, placa, fecha, duracion } = req.body;

  if (!user_id || !tipoVehiculo || !placa || !fecha || !duracion) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const sql = "INSERT INTO reservas (user_id, tipoVehiculo, placa, fecha, duracion, estado) VALUES (?, ?, ?, ?, ?, 'Activa')";
  connection.query(sql, [user_id, tipoVehiculo, placa, fecha, duracion], (err, result) => {
    if (err) {
      console.error("❌ Error al insertar reserva:", err);
      return res.status(500).json({ error: "Error al registrar la reserva" });
    }
    res.json({ message: "Reserva guardada en MySQL ✅", id: result.insertId });
  });
});
// Obtener reservas de un usuario
app.get("/reservas/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const sql = "SELECT * FROM reservas WHERE user_id = ? ORDER BY id DESC";
  connection.query(sql, [user_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});
// Cancelar reserva (actualizar estado a 'Cancelada')
app.post("/reservas/:id/cancel", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE reservas SET estado = 'Cancelada' WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Error al cancelar reserva:", err);
      return res.status(500).json({ error: "Error al cancelar reserva" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
    res.json({ message: "Reserva cancelada ✅" });
  });
});

// ✅ Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor encendido en puerto ${PORT}`);
});
