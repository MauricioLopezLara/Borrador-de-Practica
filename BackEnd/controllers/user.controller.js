const User = require('../models/User'); // Importa el modelo de usuarios

// Obtiene todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Busca todos los usuarios en la base de datos
        res.json(users); // Devuelve la lista de usuarios
    } catch (error) {
        res.status(500).json({ message: error.message }); // Responde con error si algo falla
    }
};

// Obtiene un usuario por su ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Busca el usuario por ID
        if (!user) return res.status(404).json({ message: 'User not found' }); // Responde si el usuario no existe
        res.json(user); // Devuelve los datos del usuario
    } catch (error) {
        res.status(500).json({ message: error.message }); // Responde con error si algo falla
    }
};
