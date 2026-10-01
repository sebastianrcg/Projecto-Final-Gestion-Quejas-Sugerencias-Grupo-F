CREATE TABLE investigaciones (
    id SERIAL PRIMARY KEY,
    queja_id INT REFERENCES quejas(id) ON DELETE CASCADE,
    usuario_asignado INT REFERENCES users(id),
    tipo VARCHAR(100),
    descripcion TEXT,
    archivos VARCHAR(200),  -- url cloudinary api or file, or multiple files
    estado VARCHAR(50) DEFAULT 'en progreso',
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_fin TIMESTAMP 
)