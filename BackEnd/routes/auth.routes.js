const express = require('express');
const { body } = require('express-validator');
const { register, login, refreshToken } = require('../controllers/auth.controller');

const router = express.Router();

// Rutas de autenticación
router.post('/register', [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('El email no es válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
], register);

router.post('/login', [
    body('email').isEmail().withMessage('El email no es válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
], login);

router.post('/refresh-token', refreshToken);

module.exports = router;
