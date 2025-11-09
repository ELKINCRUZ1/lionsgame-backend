import React, { useState } from 'react';
import { crearResena } from '../services/apiService'; 

const valoresIniciales = {
    puntuacion: 5,
    textoReseña: '',
    horasJugadas: 0,
    dificultad: 'Normal',
    recomendaria: true,
};

// Recibe el juegoId para vincular la reseña y las funciones de manejo
const FormularioResena = ({ juegoId, onSave, onClose }) => {
    const [formData, setFormData] = useState(valoresIniciales);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Envía el juegoId junto con los datos del formulario
        const dataToSend = {
            ...formData,
            juegoId: juegoId,
            puntuacion: Number(formData.puntuacion),
            horasJugadas: Number(formData.horasJugadas),
        };

        try {
            const nuevaResena = await crearResena(dataToSend); // Llama al POST del Backend
            onSave(nuevaResena); // Notifica a ListaReseñas
        } catch (err) {
            setError('Error al guardar la reseña. Revise que todos los campos sean válidos.');
            console.error('API Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="resena-formulario-overlay">
            <form onSubmit={handleSubmit} className="resena-formulario">
                <h4>Escribe tu Reseña</h4>

                <label>Puntuación (1-5 Estrellas):</label>
                <input 
                    type="number" 
                    name="puntuacion" 
                    value={formData.puntuacion} 
                    onChange={handleChange} 
                    min="1" max="5" required 
                />

                <label>Texto de la Reseña:</label>
                <textarea 
                    name="textoReseña" 
                    value={formData.textoReseña} 
                    onChange={handleChange} 
                    rows="5" required
                />

                <label>Horas Jugadas:</label>
                <input 
                    type="number" 
                    name="horasJugadas" 
                    value={formData.horasJugadas} 
                    onChange={handleChange} 
                    min="0"
                />

                <label>Dificultad Percibida:</label>
                <select name="dificultad" value={formData.dificultad} onChange={handleChange}>
                    <option value="Fácil">Fácil</option>
                    <option value="Normal">Normal</option>
                    <option value="Difícil">Difícil</option>
                </select>

                <label className="checkbox-label">
                    <input 
                        type="checkbox" 
                        name="recomendaria" 
                        checked={formData.recomendaria} 
                        onChange={handleChange} 
                    />
                    ¿Recomendarías este juego?
                </label>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar Reseña'}
                </button>
                <button type="button" onClick={onClose} disabled={loading}>
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default FormularioResena;