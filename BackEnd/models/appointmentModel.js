const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const Property = require('./propertyModel');

/**
 * Modelo de Cita
 */
const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Property,
            key: 'id',
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'appointments',
    timestamps: true, // createdAt, updatedAt
});

// Relación: Un usuario puede tener muchas citas
User.hasMany(Appointment, { foreignKey: 'userId' });
Appointment.belongsTo(User, { foreignKey: 'userId' });

// Relación: Una propiedad puede tener muchas citas
Property.hasMany(Appointment, { foreignKey: 'propertyId' });
Appointment.belongsTo(Property, { foreignKey: 'propertyId' });

module.exports = Appointment;
