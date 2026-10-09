const express = require("express");
const pool = require('../model/pgDatabase');

const multer = require("multer");
const {v2} = require("cloudinary");

const investigacionesRouter = express.Router();

const upload = multer({dest: "uploads/"});

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET 
})

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

investigacionesRouter.put("/cerrar/:id", async (req, res)=> {
    const id = req.params.id;

    try {
        const sql = "UPDATE investigaciones SET estado='completada', fecha_fin= CURRENT_TIMESTAMP WHERE id=$1";
        const values = [id];

        const results = await pool.query(sql, values);

        return res.json({mensaje: "Investigacion Cerrada"});

    } catch (error) {
        return res.status(500).json({error: "Error cerrando investigacion"})
    }

})

investigacionesRouter.post("/", upload.single("archivos"), async (req, res)=> {
    const {queja_id, usuario_asignado, tipo, descripcion} = req.body;

    try {
        let archivosUrl = null;

        if (req.file) {
            const imgUpload = await v2.uploader.upload(req.file.path);

            archivosUrl = imgUpload.secure_url;
        }

        const values = [queja_id, usuario_asignado, tipo, descripcion, archivosUrl];

        const sql = "INSERT INTO investigaciones (queja_id, usuario_asignado, tipo, descripcion, archivos) VALUES ($1, $2, $3, $4, $5)";

        const results = await pool.query(sql, values);

        return res.json({mensaje: "Investigacion registrada"})

    } catch (error) {
        res.status(500).json({error: "Error registrando investigacion."})
    }

})



module.exports = investigacionesRouter;