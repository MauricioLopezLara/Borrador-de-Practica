const User = require('../models/userModel'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const hashPassword = require('../utils/hashPassword');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear el nuevo usuario
        const user = new User({
            name,
            email,
            password,
            role: role || 'user', // Asignar un rol predeterminado si no se proporciona
        });

        // Encriptar la contraseña
        user.password = await bcrypt.hash(password, 10);

        // Guardar el usuario en la base de datos
        await user.save();
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Iniciar sesión y obtener token
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar al usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        // Crear y firmar un JWT
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};
