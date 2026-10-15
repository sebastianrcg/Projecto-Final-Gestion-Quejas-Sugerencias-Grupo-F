const express = require("express");
const pool = require("../model/pgDatabase");
const enviarCorreo = require("../APIs/correosApi");
const multer = require("multer");
const {v2} = require("cloudinary");

const quejasRouter = express.Router();
const upload = multer({dest: "uploads/"});

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET 
})

quejasRouter.post("/", upload.single("foto"), async (req, res) => {

    const { titulo, nombre, correo, producto, lote, tipoQueja, tracking, comentario} = req.body;

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
    const offset = (pagina - 1) * limite;

    try {
        const values = [limite, offset];
        const sql = "SELECT * FROM quejas ORDER BY fechacreacion ASC LIMIT $1 OFFSET $2";
        const results = await pool.query(sql, values);

        const sql2 = "SELECT COUNT(*) FROM quejas";
        const total = await pool.query(sql2);

        return res.json({
            quejas: results.rows,
            total: parseInt(total.rows[0].count),
            totalPaginas: Math.ceil(total.rows[0].count / limite)
        });

    } catch (error) {
        return res.status(500).json({ error: "Error obteniendo quejas." })
    }
})

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

quejasRouter.put("/asignar/:id", async (req, res)=> {
    const id = req.params.id;
    const {usuarioId} = req.body;
    try {
        const sql = "UPDATE quejas SET asignada=true, estado='asignada', usuarioasignado=$1 WHERE id=$2";
        const values =[usuarioId, id];

        const results = await pool.query(sql,values);

        return res.json({mensaje: "Queja asignada."})

    } catch (error) {
        return res.status(500).json({error: "Error asignando queja."});
    }
})

quejasRouter.get("/asignadas/:id", async (req, res)=> {

    const id = req.params.id;

    try {

        const sql = "SELECT * FROM quejas WHERE asignada = true AND usuarioasignado=$1 ORDER BY fechacreacion ASC";
        const values = [id];

        const results = await pool.query(sql, values);

        return res.json({quejas: results.rows});

    } catch (error) {
        res.status(500).json({error: "Error obteniendo quejas asignadas."})
    }

});


quejasRouter.put("/cierre/:id", async (req, res)=> {
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
            return res.json({cierre: false, mensaje: "Tareas pendientes" , resultados: resultados})
        } else if (resultados.total_investigaciones == 0 && resultados.total_acciones == 0){
            return res.json({cierre: false, confirmar: true, mensaje: "Queja sin investigaciones ni acciones" , resultados});
        } else {

            const sql2 = "UPDATE quejas SET estado = 'verificacion' WHERE id = $1";
            const results2 = await pool.query(sql2, values);
            return res.json({cierre: true, mensaje: "queja cerrada, pendiente de verificacion", resultados})
        }
    } catch (error) {
        return res.status(500).json({error: "Error cerrando queja"});
    }

});

quejasRouter.put("/cierreForzado/:id", async (req, res)=> {
    const id = req.params.id;

    try {
        const sql = "UPDATE quejas SET estado = 'verificacion' WHERE id = $1";
        const values = [id];

        const results = await pool.query(sql, values);

        return res.json({mensaje: "Queja sin investigaciones ni acciones cerrada"});

    } catch (error) {
        return res.status(500).json({error: "Error cerrando queja"});
    }

})





module.exports = quejasRouter;