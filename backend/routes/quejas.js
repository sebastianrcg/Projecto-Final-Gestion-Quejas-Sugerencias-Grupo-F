const express = require("express");
const pool = require("../model/pgDatabase");
const enviarCorreo = require("../APIs/correosApi");

const quejasRouter = express.Router();

quejasRouter.post("/", async (req, res)=>{
    const {titulo, nombre, correo, producto, lote, tipoQueja, tracking, comentario, foto} = req.body;

    try {
        const values = [titulo, nombre, correo, producto, lote, tipoQueja, tracking, comentario, foto];
        const sql = "INSERT INTO quejas (titulo, nombre, correo, producto, lote, tipoQueja, tracking, comentario, foto) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)";

        const results = await pool.query(sql, values);

        enviarCorreo(nombre, correo, tracking);

        return res.json({mensaje: "Queja registrada."});

    } catch (error) {
        return res.status(500).json({error: "Error registrando queja, intenta de nuevo"})
    }
});




module.exports = quejasRouter;