const bcrypt = require('bcryptjs');

/**
 * Función para encriptar la contraseña
 * @param {string} password - Contraseña en texto claro
 * @returns {Promise<string>} - Contraseña encriptada
 */
const hashPassword = async (password) => {
    try {
        // Genera un 'salt' para aumentar la seguridad
        const salt = await bcrypt.genSalt(10);
        
        // Encripta la contraseña utilizando el 'salt' generado
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    } catch (error) {
        throw new Error('Error al encriptar la contraseña');
    }
};

module.exports = hashPassword;
