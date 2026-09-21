CREATE TABLE users (
    id serial primary key,
    nombre varchar(50),
    apellido varchar(50),
    correo varchar(100),
    username varchar(100),
    password varchar(255),
    role varchar(50),
    fechanacimiento date,
    estado boolean default true
)