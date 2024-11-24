const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middleware/errorHandler');

// Carga de variables de entorno
dotenv.config();

// Conexión a la base de datos
connectDB();

// Inicialización de la aplicación
const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

// Puesta en marcha del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
