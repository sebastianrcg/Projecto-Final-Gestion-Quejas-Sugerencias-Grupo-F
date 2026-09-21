const express = require("express");
const pool = require("../model/pgDatabase.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

const JWT_SECRET = process.env.JWT_TOKEN;


authRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Peticion invalida" });
    }
    try {
        const sql = "SELECT * FROM users WHERE correo=$1"
        const results = await pool(sql, [username]);

        if (results.rows.length === 0) {
            return res.status(401).json({ error: "Credenciales invalidos." });
        }

        const user = results.rows[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: "Credenciales invalidos." });
        }

        delete user.password;

        const jwtToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1d" })

        req.session.user = user;
        return res.json({
            validated: true,
            user: user,
            token: jwtToken
        })


    } catch (err) {
        console.error('Error iniciando sesion:', err);
        res.status(500).json({ error: 'Error iniciando sesion, intente de nuevo.' });
    }

})

module.exports = authRouter;