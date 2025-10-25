# Parqueadero Universitario

Sistema de reservas de parqueadero para la universidad, con autenticación Firebase y almacenamiento en MySQL.

## Despliegue

### Backend (Railway)
1. Crea una cuenta en [Railway](https://railway.app).
2. Conecta tu repositorio GitHub.
3. Railway detectará automáticamente el backend (carpeta `backend/`).
4. Configura las variables de entorno en Railway:
   - `DB_HOST`: Host de tu base de datos MySQL (ej: `containers-us-west-1.aws.cloud.railway.app`)
   - `DB_USER`: Usuario de la BD
   - `DB_PASSWORD`: Contraseña de la BD
   - `DB_NAME`: Nombre de la BD
   - `DB_PORT`: Puerto (generalmente 3306)
5. Una vez desplegado, copia la URL del backend (ej: `https://tu-backend-production.up.railway.app`).

### Base de Datos
- Usa Railway para MySQL o PlanetScale para una BD gratuita.
- Ejecuta el script `backend/setup.js` para crear las tablas.

### Frontend (Netlify)
1. Crea una cuenta en [Netlify](https://netlify.com).
2. Conecta tu repositorio GitHub.
3. Configura el directorio de publicación como `src/`.
4. Una vez desplegado, actualiza `BACKEND_URL` en `src/index.html` con la URL del backend de Railway.

## Desarrollo Local
- Backend: `cd backend && npm install && npm start`
- Frontend: `npm install && npm start`
- Asegúrate de tener MySQL corriendo localmente.

## Tecnologías
- Frontend: HTML, CSS, JavaScript, Firebase
- Backend: Node.js, Express, MySQL
