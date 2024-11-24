const Property = require('../models/Property'); // Importa el modelo de propiedades

// Obtiene todas las propiedades
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find(); // Busca todas las propiedades en la base de datos
        res.json(properties); // Devuelve la lista de propiedades
    } catch (error) {
        res.status(500).json({ message: error.message }); // Responde con error si algo falla
    }
};

// Crea una nueva propiedad
exports.createProperty = async (req, res) => {
    try {
        const newProperty = new Property(req.body); // Crea una nueva instancia del modelo Property
        const savedProperty = await newProperty.save(); // Guarda la nueva propiedad en la base de datos
        res.status(201).json(savedProperty); // Devuelve la propiedad creada
    } catch (error) {
        res.status(400).json({ message: error.message }); // Responde con error si algo falla
    }
};
