const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extraer el token del encabezado

        // Verificar si el token está presente
        if (!token) {
            return res.status(401).json({ message: 'Acceso no autorizado, token requerido' });
        }

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adjuntar datos del usuario a la solicitud

        next(); // Continuar con la siguiente función
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(401).json({ message: 'Token no válido' });
    }
};
