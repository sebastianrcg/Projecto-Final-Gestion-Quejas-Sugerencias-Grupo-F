CREATE TABLE acciones (
    id serial primary key,

)

CREATE TABLE acciones_correctivas (
    id SERIAL PRIMARY KEY,
    queja_id INT REFERENCES quejas(id) ON DELETE CASCADE,
    investigation_id INT REFERENCES investigations(id) ON DELETE CASCADE,
    assigned_to INT REFERENCES users(id), -- user responsible for the action
    descripcion TEXT NOT NULL,
    resultado TEXT,
    estado VARCHAR(50) DEFAULT 'pendiente', -- pendiente, completada
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);