const express = require("express");
const pool = require('../model/pgDatabase');

const investigacionesRouter = express.Router();

investigacionesRouter.get("/queja", async (req, res) => {
    const quejaId = parseInt(req.query.quejaid);
    const usuarioId = parseInt(req.query.usuarioid)

    try {
        const sql = "SELECT * FROM investigaciones WHERE queja_id=$1 AND usuario_asignado=$2 ORDER BY fecha_inicio ASC";
        const values = [quejaId, usuarioId];

        const results = await pool.query(sql, values);

        return res.json({investigaciones: results.rows})

    } catch (error) {
        return res.status(500).json({error: "Error obteniendo investigaciones"})
    }

})



module.exports = investigacionesRouter;