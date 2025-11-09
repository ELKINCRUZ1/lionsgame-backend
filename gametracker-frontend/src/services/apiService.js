import axios from 'axios';

// URL base del Backend
const API_URL = 'http://localhost:4000/api'; 

//CRUD DE JUEGOS (API /juegos)

// 1. OBTENER TODOS LOS JUEGOS (GET /api/juegos)
export const getJuegos = async () => {
    try {
        const response = await axios.get(`${API_URL}/juegos`);
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener los juegos:', error);
        return [];
    }
};

// 2. CREAR JUEGO (POST /api/juegos)
export const crearJuego = async (juegoData) => {
    try {
        const response = await axios.post(`${API_URL}/juegos`, juegoData);
        return response.data.data;
    } catch (error) {
        console.error('Error al crear el juego:', error.response.data.error);
        throw error.response.data.error;
    }
};

// 3. ACTUALIZAR JUEGO (PUT /api/juegos/:id)
export const actualizarJuego = async (id, updatedFields) => {
    try {
        const response = await axios.put(`${API_URL}/juegos/${id}`, updatedFields);
        return response.data.data;
    } catch (error) {
        console.error('Error al actualizar el juego:', error.response.data.error);
        throw error.response.data.error;
    }
};

// 4. ELIMINAR JUEGO (DELETE /api/juegos/:id)
export const eliminarJuego = async (id) => {
    try {
        await axios.delete(`${API_URL}/juegos/${id}`);
        return true;
    } catch (error) {
        console.error('Error al eliminar el juego:', error);
        throw error;
    }
};

//CRUD DE RESEÑAS (API /reseñas)

// 5. OBTENER RESEÑAS POR ID DE JUEGO (GET /api/reseñas/juego/:juegoId)
export const getResenasPorJuego = async (juegoId) => {
    try {
        const response = await axios.get(`${API_URL}/reseñas/juego/${juegoId}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error al obtener reseñas para el juego ${juegoId}:`, error);
        return [];
    }
};

// 6. CREAR RESEÑA (POST /api/reseñas)
export const crearResena = async (resenaData) => {
    try {
        const response = await axios.post(`${API_URL}/reseñas`, resenaData);
        return response.data.data;
    } catch (error) {
        console.error('Error al crear la reseña:', error.response.data.error);
        throw error.response.data.error;
    }
};

// 7. ELIMINAR RESEÑA (DELETE /api/reseñas/:id)
export const eliminarResena = async (id) => {
    try {
        await axios.delete(`${API_URL}/reseñas/${id}`);
        return true;
    } catch (error) {
        console.error('Error al eliminar la reseña:', error);
        throw error;
    }
};
