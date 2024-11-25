const Appointment = require('../models/Appointment');
const Property = require('../models/Property');

// Crear una nueva cita
exports.createAppointment = async (req, res) => {
    try {
        const { propertyId, date } = req.body;

        // Validar campos obligatorios
        if (!propertyId || !date) {
            return res.status(400).json({ message: 'La propiedad y la fecha son obligatorias' });
        }

        // Verificar si la propiedad existe
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }

        // Crear la cita
        const appointment = new Appointment({
            property: propertyId,
            user: req.user.id, // Obtenemos el ID del usuario autenticado
            date,
        });

        await appointment.save();
        res.status(201).json({ message: 'Cita creada exitosamente', appointment });
    } catch (error) {
        console.error('Error al crear la cita:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener todas las citas del usuario autenticado
exports.getUserAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user.id })
            .populate('property', 'title location') // Incluye datos de la propiedad
            .populate('user', 'name email'); // Incluye datos del usuario
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error al obtener las citas:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener una cita específica
exports.getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findById(id)
            .populate('property', 'title location')
            .populate('user', 'name email');

        if (!appointment) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }

        res.status(200).json(appointment);
    } catch (error) {
        console.error('Error al obtener la cita:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Actualizar una cita (por ejemplo, cambiar el estado)
exports.updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const appointment = await Appointment.findByIdAndUpdate(id, updates, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }

        res.status(200).json({ message: 'Cita actualizada exitosamente', appointment });
    } catch (error) {
        console.error('Error al actualizar la cita:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Eliminar una cita
exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findByIdAndDelete(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }

        res.status(200).json({ message: 'Cita eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la cita:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
