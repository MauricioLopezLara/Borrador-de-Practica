const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Modelo de Usuario
 */
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user', // Valores posibles: 'admin', 'user'
    },
}, {
    tableName: 'users',
    timestamps: true, // createdAt, updatedAt
});

module.exports = User;