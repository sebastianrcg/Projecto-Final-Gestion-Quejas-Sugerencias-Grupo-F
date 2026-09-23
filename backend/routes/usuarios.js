const express = require("express");
const pool = require("../model/pgDatabase");
const bcrypt = require("bcrypt");

const usuariosRouter = express.Router();

usuariosRouter.get("/", async (req, res)=> {
    try {
        const sql = "SELECT id, nombre, apellido, correo, role, fechanacimiento, estado FROM users ORDER BY id ASC";
        const results = await pool.query(sql);

        return res.json({usuarios: results.rows})

    } catch (err) {
        return res.status(500).json({error: "Error obteniendo usuarios"});
    }
})

usuariosRouter.post("/", async (req, res)=>{
    const {nombre, apellido, correo, username, role, fechaNacimiento, password} = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = "INSERT INTO users (nombre, apellido, correo, username, password, role, fechanacimiento) VALUES ($1, $2, $3, $4, $5, $6, $7)"
        const values = [nombre, apellido, correo, username, hashedPassword, role, fechaNacimiento];

        const results = await pool.query(sql, values);

        return res.json({mensaje: "Usuario creado"})

    } catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({error: "Correo/Usuario ya registrado"})

        } else {
            return res.status(500).json({error: "Error creado usuario"})
        }
    }
})



module.exports = usuariosRouter;