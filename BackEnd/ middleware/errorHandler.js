// Middleware global para manejar errores
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Mostrar el error en la consola

    // Comprobamos el tipo de error y respondemos con un mensaje adecuado
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'ID no válido' });
    }

    // Respuesta por defecto para errores inesperados
    res.status(500).json({
        message: 'Hubo un error en el servidor, por favor intenta más tarde',
    });
};

module.exports = errorHandler;
