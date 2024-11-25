const Property = require('../models/Property');

// Crear una nueva propiedad
exports.createProperty = async (req, res) => {
    try {
        const { title, description, price, location, type } = req.body;

        // Validar campos obligatorios
        if (!title || !description || !price || !location || !type) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Crear la propiedad
        const property = new Property({
            title,
            description,
            price,
            location,
            type,
            createdBy: req.user.id, // Obtenemos el ID del usuario autenticado
        });

        await property.save();
        res.status(201).json({ message: 'Propiedad creada exitosamente', property });
    } catch (error) {
        console.error('Error al crear la propiedad:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener todas las propiedades
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate('createdBy', 'name email'); // Incluye datos del creador
        res.status(200).json(properties);
    } catch (error) {
        console.error('Error al obtener propiedades:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener una propiedad por ID
exports.getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findById(id).populate('createdBy', 'name email');
        if (!property) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }
        res.status(200).json(property);
    } catch (error) {
        console.error('Error al obtener la propiedad:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Actualizar una propiedad
exports.updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const property = await Property.findByIdAndUpdate(id, updates, { new: true });
        if (!property) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }

        res.status(200).json({ message: 'Propiedad actualizada exitosamente', property });
    } catch (error) {
        console.error('Error al actualizar la propiedad:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Eliminar una propiedad
exports.deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;

        const property = await Property.findByIdAndDelete(id);
        if (!property) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }

        res.status(200).json({ message: 'Propiedad eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la propiedad:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
