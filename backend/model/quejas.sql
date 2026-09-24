CREATE TABLE quejas (
    id serial primary key,
    titulo varchar(200) NOT NULL,
    nombre varchar(200) NOT NULL,
    correo varchar(200) NOT NULL,
    producto varchar(150),
    lote varchar(100),
    tipoQueja varchar(150) NOT NULL,
    tracking varchar(250) NOT NULL,
    comentario text  NOT NULL,
    estado varchar(50) default 'registrada',
    foto varchar(200) default NULL,
    fechacreacion TIMESTAMP default CURRENT_TIMESTAMP
)