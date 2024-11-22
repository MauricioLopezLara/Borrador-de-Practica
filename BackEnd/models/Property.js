const mongoose = require('mongoose'); // Importa mongoose para manejar esquemas y modelos

// Define el esquema para las propiedades
const propertySchema = new mongoose.Schema({
    title: { type: String, required: true }, // Título de la propiedad
    description: { type: String }, // Descripción opcional
    price: { type: Number, required: true }, // Precio de la propiedad
    location: { type: String, required: true }, // Ubicación de la propiedad
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Referencia al usuario dueño
}, { timestamps: true }); // Agrega marcas de tiempo (createdAt y updatedAt)

module.exports = mongoose.model('Property', propertySchema); // Exporta el modelo basado en el esquema
