const { Sequelize } = require('sequelize');

// Crear una nueva instancia de Sequelize y conectarse a la base de datos
const sequelize = new Sequelize(
    process.env.DB_NAME || 'agencia_inmobiliaria',  // Nombre de la base de datos
    process.env.DB_USER || 'root',                  // Usuario de la base de datos
    process.env.DB_PASSWORD || 'Contraseña',          // Contraseña de la base de datos
    {
        host: process.env.DB_HOST || 'localhost',   // Host de la base de datos
        dialect: process.env.DB_DIALECT || 'mysql', // Tipo de base de datos (mysql, postgres, etc.)
        logging: false,                             // Desactiva los logs de SQL
    }
);

// Función para verificar la conexión
const connectDB = async () => {
    try {
        await sequelize.authenticate(); // Verifica que la conexión sea exitosa
        console.log('Conexión a la base de datos SQL exitosa');
    } catch (error) {
        console.error('Error al conectar con la base de datos SQL:', error);
        process.exit(1); // Termina el proceso si la conexión falla
    }
};

module.exports = { sequelize, connectDB };
