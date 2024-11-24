const authService = require('../services/auth.service'); // Importa el servicio de autenticación

// Controlador para iniciar sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; // Extrae credenciales del cuerpo de la solicitud
        const token = await authService.authenticate(email, password); // Autentica y genera un token
        res.json({ token }); // Responde con el token
    } catch (error) {
        res.status(401).json({ message: error.message }); // Responde con error si la autenticación falla
    }
};

// Controlador para registrar un nuevo usuario
exports.register = async (req, res) => {
    try {
        const newUser = await authService.register(req.body); // Registra el usuario
        res.status(201).json(newUser); // Responde con los datos del usuario creado
    } catch (error) {
        res.status(400).json({ message: error.message }); // Responde con error si el registro falla
    }
};
