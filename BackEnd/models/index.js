const sequelize = require('../config/db');
const User = require('./userModel');
const Property = require('./propertyModel');
const Appointment = require('./appointmentModel');

/**
 * Sincronización de modelos con la base de datos
 */
const syncModels = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión con la base de datos establecida correctamente.');

        // Sincronizar todos los modelos
        await sequelize.sync({ alter: true });
        console.log('Todos los modelos se sincronizaron correctamente.');
    } catch (error) {
        console.error('Error al sincronizar los modelos:', error);
    }
};

module.exports = {
    sequelize,
    User,
    Property,
    Appointment,
    syncModels,
};
