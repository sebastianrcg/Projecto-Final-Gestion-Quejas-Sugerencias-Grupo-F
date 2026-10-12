CREATE TABLE acciones_correctivas (
    id SERIAL PRIMARY KEY,
    queja_id INT REFERENCES quejas(id) ON DELETE CASCADE,
    investigacion_id INT REFERENCES investigaciones(id) ON DELETE CASCADE DEFAULT NULL,
    usuario_asignado INT REFERENCES users(id), 
    descripcion TEXT NOT NULL,
    resultado TEXT,
    archivos VARCHAR(255),
    estado VARCHAR(50) DEFAULT 'pendiente', -- pendiente, completada
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_fin TIMESTAMP DEFAULT NULL
);