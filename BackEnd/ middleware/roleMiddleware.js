// Middleware para verificar roles
exports.authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            // Verificar si el rol del usuario autenticado está permitido
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Acceso denegado: no tienes permiso para realizar esta acción' });
            }
            next(); // Continuar con la solicitud si el rol es válido
        } catch (error) {
            console.error('Error en el middleware de roles:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    };
};
