const mongoose = require('mongoose'); // Importamos Mongoose para manejar la base de datos
const bcrypt = require('bcrypt'); // Importamos bcrypt para el hash de contraseñas

// Definimos el esquema del usuario
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, // El nombre es de tipo cadena de texto
            required: true, // Campo obligatorio
            trim: true, // Elimina espacios en blanco al inicio y al final
        },
        email: {
            type: String, // El correo es de tipo cadena de texto
            required: true, // Campo obligatorio
            unique: true, // No puede haber correos duplicados
            lowercase: true, // Convierte el texto a minúsculas automáticamente
            match: [
                /^\S+@\S+\.\S+$/, // Valida el formato del correo electrónico con una expresión regular
                'Correo no válido', // Mensaje en caso de que no cumpla con el formato
            ],
        },
        password: {
            type: String, // La contraseña es de tipo cadena de texto
            required: true, // Campo obligatorio
            minlength: 6, // La contraseña debe tener al menos 6 caracteres
        },
        role: {
            type: String, // El rol es de tipo cadena de texto
            enum: ['user', 'admin'], // Solo se permiten los valores 'user' o 'admin'
            default: 'user', // El valor predeterminado es 'user'
        },
    },
    {
        timestamps: true, // Agrega automáticamente las propiedades createdAt y updatedAt
    }
);

// Middleware que se ejecuta antes de guardar un usuario
userSchema.pre('save', async function (next) {
    // Si la contraseña no ha sido modificada, salta este paso
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10); // Genera un "salt" para el hash de la contraseña
        this.password = await bcrypt.hash(this.password, salt); // Convierte la contraseña en un hash seguro
        next(); // Continúa con el flujo normal
    } catch (error) {
        next(error); // Maneja errores en caso de que falle el hash
    }
});

// Método del modelo para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
    // Compara una contraseña ingresada con el hash almacenado en la base de datos
    return await bcrypt.compare(candidatePassword, this.password);
};

// Exportamos el modelo basado en el esquema
module.exports = mongoose.model('User', userSchema);
