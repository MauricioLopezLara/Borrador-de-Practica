const sql = require('mssql');

const config = {
    server: 'localhost', // Cambia si usas otro servidor o IP
    port: 1433,          // Cambia si usas otro puerto
    database: 'Inmobiliaria',
    user: 'MiUsuario',         // Usuario creado en SQL Server
    password: 'MiContraseñaSegura', // Contraseña definida
    options: {
        encrypt: false,        // Desactiva cifrado si no lo necesitas
        enableArithAbort: true // Recomendado para evitar errores matemáticos
    }
};


// Conectar a SQL Server
sql.connect(config, err => {
    if (err) {
        console.error('Error al conectar a SQL Server:', err.message);
    } else {
        console.log('Conexión exitosa a SQL Server');
    }
});
