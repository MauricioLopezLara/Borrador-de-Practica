const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

/**
 * Modelo de Propiedad
 */
const Property = sequelize.define('Property', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    tableName: 'properties',
    timestamps: true, // createdAt, updatedAt
});

// Relación: Un usuario (propietario) puede tener muchas propiedades
User.hasMany(Property, { foreignKey: 'ownerId' });
Property.belongsTo(User, { foreignKey: 'ownerId' });

module.exports = Property;
