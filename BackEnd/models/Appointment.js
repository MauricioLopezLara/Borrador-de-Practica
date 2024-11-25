const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
    {
        property: {
            type: mongoose.Schema.Types.ObjectId, // Referencia a la propiedad
            ref: 'Property',
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, // Referencia al usuario que agenda la cita
            ref: 'User',
            required: true,
        },
        date: {
            type: Date, // Fecha y hora de la cita
            required: true,
        },
        status: {
            type: String, // Estado de la cita
            enum: ['pending', 'confirmed', 'canceled'],
            default: 'pending',
        },
    },
    {
        timestamps: true, // createdAt y updatedAt
    }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
