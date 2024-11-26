const { Property } = require('../models/propertyModel');

/**
 * Crear una nueva propiedad
 */
exports.createProperty = async (req, res) => {
    try {
        const { title, description, price, address, ownerId } = req.body;

        const property = await Property.create({
            title,
            description,
            price,
            address,
            ownerId,
        });

        res.status(201).json({
            message: 'Propiedad creada exitosamente',
            property,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la propiedad' });
    }
};

/**
 * Obtener todas las propiedades
 */
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.findAll();
        res.status(200).json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener propiedades' });
    }
};

/**
 * Obtener una propiedad por ID
 */
exports.getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;

        const property = await Property.findByPk(id);
        if (!property) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }

        res.status(200).json(property);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la propiedad' });
    }
};

/**
 * Actualizar una propiedad
 */
exports.updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const property = await Property.findByPk(id);
        if (!property) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }

        await property.update(updates);

        res.status(200).json({
            message: 'Propiedad actualizada exitosamente',
            property,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la propiedad' });
    }
};

/**
 * Eliminar una propiedad
 */
exports.deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;

        const property = await Property.findByPk(id);
        if (!property) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }

        await property.destroy();

        res.status(200).json({ message: 'Propiedad eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la propiedad' });
    }
};
