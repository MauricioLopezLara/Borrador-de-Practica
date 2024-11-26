const { Appointment } = require('../models/appointmentModel');

/**
 * Crear una nueva cita
 */
exports.createAppointment = async (req, res) => {
    try {
        const { userId, propertyId, date } = req.body;

        const appointment = await Appointment.create({
            userId,
            propertyId,
            date,
        });

        res.status(201).json({
            message: 'Cita creada exitosamente',
            appointment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la cita' });
    }
};

/**
 * Obtener todas las citas
 */
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las citas' });
    }
};

/**
 * Eliminar una cita
 */
exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }

        await appointment.destroy();

        res.status(200).json({ message: 'Cita eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la cita' });
    }
};
