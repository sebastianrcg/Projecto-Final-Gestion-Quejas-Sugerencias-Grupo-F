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




module.exports = quejasRouter;