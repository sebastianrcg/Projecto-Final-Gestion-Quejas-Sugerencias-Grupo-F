const express = require("express");
const pool = require("../model/pgDatabase");
const multer = require("multer");


const {v2} = require("cloudinary");

const accionesCorrectivasRouter = express.Router();

const upload = multer({dest: "uploads/"});

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET 
})

accionesCorrectivasRouter.post("/", upload.single("archivos"),async (req, res)=> {

    const {queja_id, usuario_asignado, descripcion, resultado} = req.body;

    try {

        let archivosUrl = null;

        if (req.file) {
            const imgUpload = await v2.uploader.upload(req.file.path);

            archivosUrl = imgUpload.secure_url;
        }

        const values = [queja_id, usuario_asignado, descripcion, resultado, archivosUrl];

        const sql = "INSERT INTO acciones_correctivas (queja_id, usuario_asignado, descripcion, resultado, archivos) VALUES ($1, $2, $3, $4, $5)";

        const results = await pool.query(sql, values);

        return res.json({mensaje: "Acción Correctiva registrada"});

    } catch (error) {
        return res.status(500).json({error: "Error registrando Acción Correctiva."})
    }

});

module.exports = accionesCorrectivasRouter; 