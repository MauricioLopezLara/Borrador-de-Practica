const sql = require('mssql');

const config = {
    server: 'localhost', // Nombre del servidor o dirección IP
    port: 1433,          // Cambia este valor al puerto que usa tu SQL Server
    database: 'Inmobiliaria', // Nombre de la base de datos
    options: {
        encrypt: false,         // En Windows, generalmente no necesitas cifrado
        enableArithAbort: true  // Recomendado para evitar problemas con ciertas consultas
    },
    authentication: {
        type: 'ntlm',           // Usar autenticación de Windows
        options: {
            domain: 'LPK',      // Dominio de tu máquina o red
            userName: 'krnd_',  // Nombre de usuario de Windows
            password: '04092003' // Contraseña del usuario de Windows
        }
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
