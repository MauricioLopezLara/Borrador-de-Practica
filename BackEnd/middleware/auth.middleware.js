const jwt = require('jsonwebtoken');

// Verificar token de acceso
exports.verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }

        req.user = decoded; // Adjuntar datos del usuario al objeto de la solicitud
        next();
    });
};

// Verificar roles de usuario
exports.verifyRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }
    next();
};
