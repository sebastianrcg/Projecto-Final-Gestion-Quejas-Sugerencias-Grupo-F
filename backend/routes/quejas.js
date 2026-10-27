const express = require("express");
const pool = require("../model/pgDatabase");
const enviarCorreo = require("../APIs/correosApi");
const multer = require("multer");
const { v2 } = require("cloudinary");

const quejasRouter = express.Router();
const upload = multer({ dest: "uploads/" });

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

quejasRouter.post("/", upload.single("foto"), async (req, res) => {

    const { titulo, nombre, correo, producto, lote, tipoQueja, tracking, comentario } = req.body;

    try {

        let fotoUrl = null;

        if (req.file) {
            const imgUpload = await v2.uploader.upload(req.file.path);
            fotoUrl = imgUpload.secure_url
        }

        const values = [titulo, nombre, correo, producto, lote, tipoQueja, tracking, comentario, fotoUrl];
        const sql = "INSERT INTO quejas (titulo, nombre, correo, producto, lote, tipoQueja, tracking, comentario, foto) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)";

        const results = await pool.query(sql, values);

        enviarCorreo(nombre, correo, tracking);

        return res.json({ mensaje: "Queja registrada." });

    } catch (error) {
        return res.status(500).json({ error: "Error registrando queja, intenta de nuevo" })
    }
});

quejasRouter.get("/", async (req, res) => {

    const pagina = parseInt(req.query.pagina) || 1;
    const limite = parseInt(req.query.limite) || 20;
    const categoria = req.query.categoria;
    const estado = req.query.estado;
    const orden = req.query.orden;

    const offset = (pagina - 1) * limite;

    try {

        let results;
        let total;

        if (categoria) {

            let search;
            if (categoria === "defectosProducto") {
                search = "('empaque_defectuoso', 'mal_olor_sabor', 'producto_contaminado', 'vencido_fechaIlegible', 'error_etiqueta', 'variacion_peso')";

            } else if (categoria === "problemaProceso") {
                search = "('calibracion_maquinaria', 'temperatura_presion', 'mezcla_incorrecta', 'retraso_produccion', 'falta_calidad')";

            } else if (categoria === "distribucionLogistica") {
                search = "('retraso_entrega', 'daños_transporte', 'error_cantidad', 'trazabilidad_lote')";
            } else if (categoria === "atencionCliente") {
                search = "('respuesta_tardia', 'trato_inadecuado', 'falta_informacion', 'comunicacion_confusa')";
            } else if (categoria === "cumplimientoNormas") {
                search = "('incumplimiento_normas', 'registro_inspeccion', 'documentation_incompleta')";
            } else if (categoria === "otra") {
                search = "('otra')";
            }

            if (estado) {

                const sql = `SELECT * FROM quejas WHERE tipoqueja IN ${search} AND estado = $1 ORDER BY fechacreacion ${orden} LIMIT $2 OFFSET $3`;
                const values = [estado, limite, offset];

                results = await pool.query(sql, values);

                const sql2 = `SELECT COUNT(*) FROM quejas WHERE tipoqueja IN ${search} AND estado = $1`;
                total = await pool.query(sql2, [estado]);

            } else {

                const sql = `SELECT * FROM quejas WHERE tipoqueja IN ${search} AND estado != 'cerrada' ORDER BY fechacreacion ${orden} LIMIT $1 OFFSET $2`;
                const values = [limite, offset];

                results = await pool.query(sql, values);

                const sql2 = `SELECT COUNT(*) FROM quejas WHERE tipoqueja IN ${search} AND estado != 'cerrada'`;
                total = await pool.query(sql2);

            }



        } else {

            if (estado) {

                const sql = `SELECT * FROM quejas WHERE estado = $1 ORDER BY fechacreacion ${orden} LIMIT $2 OFFSET $3`;
                results = await pool.query(sql, [estado, limite, offset]);

                const sql2 = "SELECT COUNT(*) FROM quejas WHERE estado = $1";
                total = await pool.query(sql2, [estado]);

            } else {

                const sql = `SELECT * FROM quejas WHERE estado != 'cerrada' ORDER BY fechacreacion ${orden} LIMIT $1 OFFSET $2`;
                results = await pool.query(sql, [limite, offset]);

                const sql2 = "SELECT COUNT(*) FROM quejas WHERE estado != 'cerrada'";
                total = await pool.query(sql2);

            }

        }

        // const values = [limite, offset];
        // const sql = "SELECT * FROM quejas ORDER BY fechacreacion ASC LIMIT $1 OFFSET $2";
        // const results = await pool.query(sql, values);

        // const sql2 = "SELECT COUNT(*) FROM quejas";
        // const total = await pool.query(sql2);

        return res.json({
            quejas: results.rows,
            total: parseInt(total.rows[0].count),
            totalPaginas: Math.ceil(total.rows[0].count / limite)
        });

    } catch (error) {
        return res.status(500).json({ error: "Error obteniendo quejas." })
    }
})

quejasRouter.get("/porconfirmar", async (req, res) => {
    try {
        const sql = "SELECT * FROM quejas WHERE estado='verificacion' ORDER BY fechacreacion ASC";
        const results = await pool.query(sql);
        return res.json({ quejas: results.rows });
    } catch (error) {
        return res.status(500).json({ error: "Error obteniendo quejas por confirmar" });
    }
});

quejasRouter.get("/:id", async (req, res) => {

    const id = req.params.id;
    try {
        const sql = "SELECT * FROM quejas WHERE id=$1";
        const values = [id];
        const results = await pool.query(sql, values);

        return res.json({ queja: results.rows });

    } catch (error) {
        return res.status(500).json({ error: "Error obteniendo queja." })
    }
})

quejasRouter.get("/tracking/:tracking", async (req, res) => {

    const tracking = req.params.tracking;
    try {
        const sql = "SELECT id, correo, tracking, estado, fechacreacion, nombre FROM quejas WHERE tracking=$1";
        const values = [tracking];
        const results = await pool.query(sql, values);

        return res.json({ queja: results.rows });

    } catch (error) {
        return res.status(500).json({ error: "Error obteniendo queja." })
    }
});

quejasRouter.put("/asignar/:id", async (req, res) => {
    const id = req.params.id;
    const { usuarioId } = req.body;
    try {
        const sql = "UPDATE quejas SET asignada=true, estado='asignada', usuarioasignado=$1, fecha_asignada= CURRENT_TIMESTAMP WHERE id=$2";
        const values = [usuarioId, id];

        const results = await pool.query(sql, values);

        return res.json({ mensaje: "Queja asignada." })

    } catch (error) {
        return res.status(500).json({ error: "Error asignando queja." });
    }
});

quejasRouter.put("/reabrir/:id", async (req, res)=>{
    const id = req.params.id;

    try {
        const sql = "UPDATE quejas SET estado= 'asignada' WHERE id=$1";
        const results = await pool.query(sql, [id]);

        return res.json({mensaje: "Queja reabierta."})


    } catch (error) {
        return res.status(500).json({error: "Error reabriendo quejas."})
    }

})

quejasRouter.get("/asignadas/:id", async (req, res) => {

    const id = req.params.id;

    try {

        const sql = "SELECT * FROM quejas WHERE asignada = true AND usuarioasignado=$1 AND estado != 'cerrada' AND estado != 'verificacion' ORDER BY fechacreacion ASC";
        const values = [id];

        const results = await pool.query(sql, values);

        return res.json({ quejas: results.rows });

    } catch (error) {
        res.status(500).json({ error: "Error obteniendo quejas asignadas." })
    }

});


quejasRouter.put("/cierre/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const values = [id];
        const sql = " SELECT (SELECT COUNT(*) FROM investigaciones WHERE queja_id = $1) AS total_investigaciones, (SELECT COUNT(*) from acciones_correctivas WHERE queja_id = $1) AS total_acciones, (SELECT COUNT(*) FROM investigaciones WHERE queja_id = $1 AND estado = 'en progreso') AS investigaciones_pendientes, (SELECT COUNT(*) FROM acciones_correctivas WHERE queja_id = $1 AND estado = 'pendiente') AS acciones_pendientes";

        const results = await pool.query(sql, values);

        //     {
        //     "total_investigaciones": "7",
        //     "total_acciones": "4",
        //     "investigaciones_pendientes": "2",
        //     "acciones_pendientes": "1"
        // }

        const resultados = results.rows[0];

        // return res.json(results.rows[0]);

        if (resultados.investigaciones_pendientes > 0 || resultados.acciones_pendientes > 0) {
            return res.json({ cierre: false, mensaje: "Tareas pendientes", resultados: resultados })
        } else if (resultados.total_investigaciones == 0 && resultados.total_acciones == 0) {
            return res.json({ cierre: false, confirmar: true, mensaje: "Queja sin investigaciones ni acciones", resultados });
        } else {

            const sql2 = "UPDATE quejas SET estado = 'verificacion', fecha_verificacion= CURRENT_TIMESTAMP WHERE id = $1";
            const results2 = await pool.query(sql2, values);
            return res.json({ cierre: true, mensaje: "queja cerrada, pendiente de verificacion", resultados })
        }
    } catch (error) {
        return res.status(500).json({ error: "Error cerrando queja" });
    }

});

quejasRouter.put("/cierreForzado/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const sql = "UPDATE quejas SET estado = 'verificacion', fecha_verificacion= CURRENT_TIMESTAMP WHERE id = $1";
        const values = [id];

        const results = await pool.query(sql, values);

        return res.json({ mensaje: "Queja sin investigaciones ni acciones cerrada" });

    } catch (error) {
        return res.status(500).json({ error: "Error cerrando queja" });
    }
});

quejasRouter.put("/cambioEstado/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const sql = "UPDATE quejas SET estado = 'trabajando', fecha_trabajo= CURRENT_TIMESTAMP WHERE id = $1";
        const values = [id];

        const results = await pool.query(sql, values);

        return res.json({ mensaje: "Estado actualizado" });

    } catch (error) {
        return res.status(500).json({ error: "Error actualizando estado" });
    }
});

quejasRouter.put("/confirmarCierre/:id", async (req, res) => {
    const id = req.params.id;
    const { usuario_cierre } = req.body;

    try {
        const sql = "UPDATE quejas SET estado='cerrada', fecha_cierre=CURRENT_TIMESTAMP, usuario_cierre=$1 WHERE id=$2";
        const values = [usuario_cierre, id];

        const results = await pool.query(sql, values);

        return res.json({ mensaje: "Solicitud verificada y cerrada" });

    } catch (error) {
        return res.status(500).json({ error: "Error cerrando queja." })
    }
})







module.exports = quejasRouter;