const jwt = require('jsonwebtoken'); // Para generar tokens JWT
const User = require('../models/User'); // Modelo de usuario

// Controlador para iniciar sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; // Extraemos el correo y la contraseña del cuerpo de la solicitud

        // Validar campos obligatorios
        if (!email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Buscar el usuario en la base de datos por correo
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' }); // Si el usuario no existe
        }

        // Verificar si la contraseña proporcionada es válida
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales incorrectas' }); // Si la contraseña no coincide
        }

        // Generar un token JWT para el usuario
        const token = jwt.sign(
            { id: user._id, role: user.role }, // Datos que queremos incluir en el token
            process.env.JWT_SECRET, // Llave secreta para firmar el token
            { expiresIn: '1h' } // Tiempo de expiración del token (1 hora en este caso)
        );

        // Respuesta exitosa con el token
        res.status(200).json({ token, message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error en el servidor' }); // Error genérico del servidor
    }
};
