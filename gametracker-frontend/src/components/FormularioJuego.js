import React, { useState } from 'react';
import { crearJuego, actualizarJuego } from '../services/apiService';

// Valores iniciales basados en los campos de tu modelo Juego.js
const valoresIniciales = {
    titulo: '',
    plataforma: '',
    genero: '',
    añoLanzamiento: new Date().getFullYear(),
    desarrollador: '',
    imagenPortada: '',
    descripcion: '',
    completado: false,
};

// Recibe juegoToEdit si estamos editando, y onSave/onClose del padre
const FormularioJuego = ({ juegoToEdit, onSave, onClose }) => {
    // Si hay un juego para editar, usa sus valores. Si no, usa valoresIniciales.
    const [formData, setFormData] = useState(juegoToEdit || valoresIniciales);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const isEditing = !!juegoToEdit;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Prepara los datos para enviar
        const dataToSend = {
            ...formData,
            añoLanzamiento: Number(formData.añoLanzamiento),
        };

        try {
            let juegoGuardado;
            if (isEditing) {
                // Llama al PUT del Backend
                juegoGuardado = await actualizarJuego(juegoToEdit._id, dataToSend);
            } else {
                // Llama al POST del Backend
                juegoGuardado = await crearJuego(dataToSend);
            }

            onSave(juegoGuardado); // Notifica al componente padre (BibliotecaJuegos)
        } catch (err) {
            setError(isEditing ? 'Error al actualizar el juego.' : 'Error al crear el juego.');
            console.error('API Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="formulario-modal">
            <h3>{isEditing ? 'Editar Juego' : 'Agregar Nuevo Juego'}</h3>
            
            <form onSubmit={handleSubmit}>
                <label>Título:</label>
                <input 
                    type="text" 
                    name="titulo" 
                    value={formData.titulo} 
                    onChange={handleChange} 
                    required 
                />

                <label>Plataforma:</label>
                <input 
                    type="text" 
                    name="plataforma" 
                    value={formData.plataforma} 
                    onChange={handleChange} 
                    required 
                />
                
                <label>Género:</label>
                <input 
                    type="text" 
                    name="genero" 
                    value={formData.genero} 
                    onChange={handleChange} 
                    required 
                />

                <label>URL de Portada (Imagen):</label>
                <input 
                    type="url" 
                    name="imagenPortada" 
                    value={formData.imagenPortada} 
                    onChange={handleChange} 
                />
                
                <label>Descripción:</label>
                <textarea 
                    name="descripcion" 
                    value={formData.descripcion} 
                    onChange={handleChange} 
                    rows="4"
                />

                <label>
                    <input 
                        type="checkbox" 
                        name="completado" 
                        checked={formData.completado} 
                        onChange={handleChange} 
                    />
                    Juego Completado
                </label>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Juego')}
                </button>
                <button type="button" onClick={onClose} disabled={loading}>
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default FormularioJuego;