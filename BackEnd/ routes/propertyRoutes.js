const express = require('express');
const { 
    createProperty, 
    getAllProperties, 
    getPropertyById, 
    updateProperty, 
    deleteProperty 
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware'); // Middleware de autenticación

const router = express.Router();

// Rutas para gestionar propiedades
router.post('/', protect, createProperty); // Crear propiedad
router.get('/', getAllProperties); // Obtener todas las propiedades
router.get('/:id', getPropertyById); // Obtener una propiedad por ID
router.put('/:id', protect, updateProperty); // Actualizar propiedad
router.delete('/:id', protect, deleteProperty); // Eliminar propiedad

module.exports = router;
