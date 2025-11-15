const Resena = require('../models/Resena'); 

// 1. OBTENER TODAS LAS RESEÑAS (GET /api/reseñas)
const obtenerTodasLasResenas = async (req, res) => {
    try {
        const resenas = await Resena.find({});
        res.status(200).json({ success: true, data: resenas });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al obtener las reseñas.' });
    }
};

// 2. OBTENER RESEÑAS POR ID DE JUEGO (GET /api/reseñas/juego/:juegoId)
const obtenerResenasPorJuego = async (req, res) => {
    try {
        // Busca reseñas donde el campo juegoId sea igual al parámetro en la URL
        const resenas = await Resena.find({ juegoId: req.params.juegoId }); 

        if (resenas.length === 0) {
            return res.status(200).json({ success: true, message: 'No se encontraron reseñas para este juego.', data: [] });
        }

        res.status(200).json({ success: true, data: resenas });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al buscar las reseñas por juego.' });
    }
};

// 3. CREAR RESEÑA (POST /api/reseñas)
const crearResena = async (req, res) => {
    try {
        const nuevaResena = await Resena.create(req.body); 
        res.status(201).json({ success: true, data: nuevaResena });
    } catch (error) {
        // Error 400 Bad Request si fallan las validaciones de Mongoose
        res.status(400).json({ success: false, error: error.message });
    }
};

// 4. ACTUALIZAR RESEÑA (PUT /api/reseñas/:id)
const actualizarResena = async (req, res) => {
    try {
        const resenaActualizada = await Resena.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
            runValidators: true // Ejecuta las validaciones del esquema (min/max, required, etc.)
        });

        if (!resenaActualizada) {
            return res.status(404).json({ success: false, error: 'Reseña no encontrada.' });
        }
        res.status(200).json({ success: true, data: resenaActualizada });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// 5. ELIMINAR RESEÑA (DELETE /api/reseñas/:id)
const eliminarResena = async (req, res) => {
    try {
        const resenaEliminada = await Resena.findByIdAndDelete(req.params.id);

        if (!resenaEliminada) {
            return res.status(404).json({ success: false, error: 'Reseña no encontrada para eliminar.' });
        }
        // Estado 200 de éxito
        res.status(200).json({ success: true, message: 'Reseña eliminada con éxito.' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    obtenerTodasLasResenas,
    obtenerResenasPorJuego,
    crearResena,
    actualizarResena,
    eliminarResena
};