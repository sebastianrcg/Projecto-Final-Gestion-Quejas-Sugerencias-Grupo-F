const express = require("express");
const pool = require("../model/pgDatabase");

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



module.exports = usuariosRouter;