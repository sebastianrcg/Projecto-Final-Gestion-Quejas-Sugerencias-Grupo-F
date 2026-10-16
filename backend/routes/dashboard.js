const express = require("express");
const pool = require("../model/pgDatabase");

const analyticsRouter = express.Router();

analyticsRouter.get("/stats1", async (req, res) => {
    try {
        const sql = `SELECT 
        (SELECT COUNT(*) FROM quejas WHERE estado != 'cerrada') AS total_abiertas,
        (SELECT COUNT(*) FROM quejas WHERE estado = 'cerrada') AS total_cerradas,
        (SELECT COUNT(*) FROM quejas) AS total_quejas,
        (SELECT COUNT(*) FROM quejas WHERE estado = 'verificacion') AS total_verificar,
        (SELECT COUNT(*) FROM quejas WHERE estado = 'asignada' OR estado = 'trabajando') AS total_proceso,
        (SELECT COUNT(*) FROM quejas WHERE estado = 'registrada') AS total_registradas`;
         
        const results = await pool.query(sql);

        return res.json({stats: results.rows[0]})

    } catch (error) {
        res.status(500).json({ error: "Error obteniendo metricas." })
    }
})



module.exports = analyticsRouter;