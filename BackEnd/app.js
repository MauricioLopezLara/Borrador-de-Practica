const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const errorHandler = require('./middleware/errorHandler');
const { connectDB } = require('./db'); // Importar la función de conexión
const { syncModels } = require('./models/userModel');

dotenv.config();
// Conectar a la base de datos SQL antes de iniciar el servidor
connectDB();
// Sincronizar los modelos con la base de datos al inicio
syncModels();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas principales
app.use('/api/auth', authRoutes);

// Manejo de errores (ejemplo básico)
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Rutas de propiedades
app.use('/api/properties', propertyRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

// Rutas de citas
app.use('/api/appointments', appointmentRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Middlewares y rutas
app.use(express.json()); 


module.exports = app;
