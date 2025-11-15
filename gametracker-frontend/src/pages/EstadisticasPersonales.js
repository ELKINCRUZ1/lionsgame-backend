import React from 'react'; 
import './EstadisticasPersonales.css'; 


const datosEstadisticos = {
    totalJuegos: 18,
    juegosCompletados: 12,
    porcentajeCompletado: 66.7, 
    totalHoras: 450,
    plataformaPrincipal: 'PC',

    // Desglose por GÉNERO 
    generosFavoritos: [
        { nombre: 'RPG', porcentaje: 35 },
        { nombre: 'Acción', porcentaje: 25 },
        { nombre: 'Estrategia', porcentaje: 15 },
        { nombre: 'Plataformas', porcentaje: 10 },
        { nombre: 'Otros', porcentaje: 15 },
    ],
 
    puntuacionPromedio: 4.2,
    dificultadPreferida: 'Normal',
};


// Componente para la barra de progreso pixelada

const ProgresoPixel = ({ porcentaje, color }) => (
    <div className="progreso-bar-container">
        <div 
            className="progreso-bar" 
            style={{ width: `${porcentaje}%`, backgroundColor: color }}
        />
    </div>
);


const EstadisticasPersonales = () => {
    
    const stats = datosEstadisticos; 
 
    return (
        <div className="stats-container">
            <h1>📊 Dashboard de LionsGame</h1>
            <p className="stats-subtitle">Análisis de tu actividad de juego.</p>

            <div className="stats-grid">
                
                {/* 1. JUEGOS COMPLETADOS */}
                <div className="stat-panel panel-rojo">
                    <h2 className="panel-title">🏆 Tasa de Finalización</h2>
                    <p className="panel-value">{stats.porcentajeCompletado}%</p>
                    <ProgresoPixel 
                        porcentaje={stats.porcentajeCompletado} 
                        color="var(--fucsia)" 
                    />
                    <small>({stats.juegosCompletados} de {stats.totalJuegos} completados)</small>
                </div>

                {/* 2. TOTAL DE HORAS */}
                <div className="stat-panel panel-azul">
                    <h2 className="panel-title">⏱️ Horas Registradas</h2>
                    <p className="panel-value">{stats.totalHoras}</p>
                    <small>Horas de juego estimadas</small>
                </div>

                {/* 3. PUNTUACIÓN PROMEDIO */}
                <div className="stat-panel panel-amarillo">
                    <h2 className="panel-title">⭐ Puntuación Promedio</h2>
                    <p className="panel-value">{stats.puntuacionPromedio} / 5</p>
                    <small>Dificultad preferida: {stats.dificultadPreferida}</small>
                </div>

                {/* 4. DESGLOSE POR GÉNERO (Gráfico de barras retro) */}
                <div className="stat-panel panel-verde panel-genero">
                    <h2 className="panel-title">🎮 Géneros Favoritos</h2>
                    <div className="genero-list">
                        {stats.generosFavoritos.map((genero, index) => (
                            <div key={index} className="genero-item">
                                <span className="genero-nombre">{genero.nombre}</span>
                                <span className="genero-porcentaje">{genero.porcentaje}%</span>
                                <ProgresoPixel 
                                    porcentaje={genero.porcentaje} 
                                    color="var(--naranja)" 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstadisticasPersonales;