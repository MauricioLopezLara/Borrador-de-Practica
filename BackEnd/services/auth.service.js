const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Función para registrar un usuario
const registerUser = async ({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword,
    });

    await user.save();
    return user;
};

// Función para validar las credenciales de inicio de sesión
const validateUserCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }

    return user;
};

// Función para generar un token JWT
const generateToken = (payload, secret, expiresIn) => {
    return jwt.sign(payload, secret, { expiresIn });
};

// Función para validar un token JWT
const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error('Token inválido o expirado');
    }
};

// Función para generar tokens de acceso y de renovación
const generateAuthTokens = (userId) => {
    const accessToken = generateToken({ id: userId }, process.env.JWT_SECRET, '1h');
    const refreshToken = generateToken({ id: userId }, process.env.JWT_REFRESH_SECRET, '7d');
    return { accessToken, refreshToken };
};

module.exports = {
    registerUser,
    validateUserCredentials,
    generateToken,
    verifyToken,
    generateAuthTokens,
};
