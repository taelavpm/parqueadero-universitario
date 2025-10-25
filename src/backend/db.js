import mysql from "mysql2";

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "122805", // Tu contraseña de MySQL Workbench
    database: process.env.DB_NAME || "parqueadero", // Nombre de tu BD (debe existir en MySQL)
    port: process.env.DB_PORT || 3306
});

export default connection;
