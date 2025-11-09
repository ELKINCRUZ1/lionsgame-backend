import React, { useState, useEffect } from 'react';
import { getJuegos, getResenasPorJuego } from '../services/apiService';

// Función utilitaria para calcular el promedio de puntuaciones
const calcularEstadisticas = (juegos, resenas) => {
    // 1. Juegos Completados
    const completados = juegos.filter(j => j.completado).length;
    const totalJuegos = juegos.length;
    
    // 2. Puntuación Promedio
    let totalPuntuacion = 0;
    let numResenas = 0;

    //Datos de juegos:
    
    // Placeholder para la dificultad
    const dificultadPromedio = 'Normal'; 

    return {
        totalJuegos,
        completados,
        pendientes: totalJuegos - completados,
        porcentajeCompletado: totalJuegos > 0 ? ((completados / totalJuegos) * 100).toFixed(1) : 0,
        puntuacionPromedio: totalPuntuacion > 0 ? (totalPuntuacion / numResenas).toFixed(2) : 'N/A',
        dificultadPromedio,
    };
};


const EstadisticasPersonales = () => {
    const [juegos, setJuegos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({}); // Estado para guardar las estadísticas calculadas

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Solo cargamos los juegos por ahora
                const juegosData = await getJuegos(); 
                setJuegos(juegosData);
                
                // Estadísticas simples
                const calculatedStats = calcularEstadisticas(juegosData, []); 
                setStats(calculatedStats);
                
                setLoading(false);
            } catch (err) {
                setError('Error al cargar datos para estadísticas.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Cargando estadísticas...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="estadisticas-dashboard">
            <h2>📊 Dashboard de Estadísticas Personales</h2>
            
            <div className="stats-resumen">
                <div className="stat-card">
                    <h3>Total de Juegos</h3>
                    <p>{stats.totalJuegos}</p>
                </div>
                <div className="stat-card">
                    <h3>Juegos Completados</h3>
                    <p>{stats.completados} ({stats.porcentajeCompletado}%)</p>
                </div>
                <div className="stat-card">
                    <h3>Juegos Pendientes</h3>
                    <p>{stats.pendientes}</p>
                </div>
                <div className="stat-card">
                    <h3>Puntuación Promedio</h3>
                    <p>{stats.puntuacionPromedio} ⭐</p>
                </div>
            </div>
            
            {/* Puedes añadir gráficos aquí si usas alguna librería como Chart.js */}
            
            <p className="nota-estadisticas">
                * Las estadísticas se basan en la data actual de tu biblioteca y reseñas.
            </p>
        </div>
    );
};

export default EstadisticasPersonales;