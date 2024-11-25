const mongoose = require('mongoose');

// Definimos el esquema de la propiedad
const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String, // Nombre o título de la propiedad
            required: true, // Campo obligatorio
            trim: true, // Elimina espacios al inicio y final
        },
        description: {
            type: String, // Descripción detallada de la propiedad
            required: true,
            trim: true,
        },
        price: {
            type: Number, // Precio de la propiedad
            required: true,
        },
        location: {
            type: String, // Ubicación o dirección
            required: true,
            trim: true,
        },
        type: {
            type: String, // Tipo de propiedad: casa, departamento, etc.
            enum: ['house', 'apartment', 'commercial', 'land'], // Opciones válidas
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, // Referencia al usuario que creó la propiedad
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true, // Agrega automáticamente createdAt y updatedAt
    }
);

// Exportamos el modelo
module.exports = mongoose.model('Property', propertySchema);
