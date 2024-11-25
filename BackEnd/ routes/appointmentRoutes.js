const express = require('express');
const { 
    createAppointment, 
    getUserAppointments, 
    getAppointmentById, 
    updateAppointment, 
    deleteAppointment 
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Rutas para gestionar citas
router.post('/', protect, authorizeRoles('user', 'admin'), createAppointment); // Usuarios y administradores pueden crear citas
router.get('/', protect, authorizeRoles('user', 'admin'), getUserAppointments); // Obtener citas del usuario autenticado
router.get('/:id', protect, authorizeRoles('user', 'admin'), getAppointmentById); // Obtener una cita por ID
router.put('/:id', protect, authorizeRoles('admin'), updateAppointment); // Solo administradores pueden actualizar citas
router.delete('/:id', protect, authorizeRoles('admin'), deleteAppointment); // Solo administradores pueden eliminar citas

module.exports = router;
