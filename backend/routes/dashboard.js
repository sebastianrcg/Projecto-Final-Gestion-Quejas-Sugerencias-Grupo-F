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

        return res.json({ stats: results.rows[0] })

    } catch (error) {
        res.status(500).json({ error: "Error obteniendo metricas." })
    }
})

analyticsRouter.get("/stats2", async (req, res) => {
    try {
        const sql = "SELECT tipoqueja FROM quejas WHERE estado != 'cerrada'";
        const results = await pool.query(sql);

        const quejas = results.rows;
        const categorias_quejas = {
            "empaque_defectuoso": "Defectos de Producto",
            "mal_olor_sabor": "Defectos de Producto",
            "producto_contaminado": "Defectos de Producto",
            "vencido_fechaIlegible": "Defectos de Producto",
            "error_etiqueta": "Defectos de Producto",
            "variacion_peso": "Defectos de Producto",

            "calibracion_maquinaria": "Problemas de Proceso",
            "temperatura_presion": "Problemas de Proceso",
            "mezcla_incorrecta": "Problemas de Proceso",
            "retraso_produccion": "Problemas de Proceso",
            "falta_calidad": "Problemas de Proceso",


            "retraso_entrega": "Distribucion y Logistica",
            "daños_transporte": "Distribucion y Logistica",
            "error_cantidad": "Distribucion y Logistica",
            "trazabilidad_lote": "Distribucion y Logistica",


            "respuesta_tardia": "Atencion al Cliente",
            "trato_inadecuado": "Atencion al Cliente",
            "falta_informacion": "Atencion al Cliente",
            "comunicacion_confusa": "Atencion al Cliente",


            "incumplimiento_normas": "Cumplimiento y documentacion",
            "registro_inspeccion": "Cumplimiento y documentacion",
            "documentation_incompleta": "Cumplimiento y documentacion",

            "otra": "otra"
        }

        let defectosProductos = 0;
        let problemaProceso = 0;
        let distribucionLogistica = 0;
        let atencionCliente = 0
        let cumplimientoNormas = 0;
        let otra = 0

        for (const queja of quejas) {
            const valor = queja["tipoqueja"];
            const categoria = categorias_quejas[valor];

            if (categoria === "Defectos de Producto"){
                defectosProductos += 1;
            } else if (categoria === "Problemas de Proceso"){
                problemaProceso += 1;
            } else if (categoria === "Distribucion y Logistica") {
                distribucionLogistica += 1;
            } else if (categoria === "Atencion al Cliente") {
                atencionCliente += 1;
            } else if (categoria === "Cumplimiento y documentacion") {
                cumplimientoNormas += 1;
            } else if (categoria === "otra"){
                otra += 1;
            }
        }

        return res.json({defectosProductos, problemaProceso, distribucionLogistica, atencionCliente, cumplimientoNormas, otra})

    } catch (error) {
        return res.status(500).json({ error: "Error obteniendo metricas de categorias de quejas" });
    }

})





module.exports = analyticsRouter;

