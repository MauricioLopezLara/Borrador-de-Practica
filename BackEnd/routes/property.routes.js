const express = require('express'); // Importa express
const router = express.Router(); // Crea un router
const propertyController = require('../controllers/property.controller'); // Importa el controlador de propiedades

// Rutas para propiedades
router.get('/', propertyController.getAllProperties); // Obtiene todas las propiedades
router.post('/', propertyController.createProperty); // Crea una nueva propiedad

module.exports = router; // Exporta las rutas
