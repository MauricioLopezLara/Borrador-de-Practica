const express = require('express');
const { createUser, getAllUsers, loginUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Middleware para autenticación
const { authorizeRoles } = require('../middleware/roleMiddleware'); // Middleware para roles

const router = express.Router();

// Ruta para crear un nuevo usuario (solo admin)
router.post('/', protect, authorizeRoles('admin'), createUser);

// Ruta para obtener todos los usuarios (solo admin)
router.get('/', protect, authorizeRoles('admin'), getAllUsers);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para crear un nuevo usuario
router.post('/', createUser);

module.exports = router;
