const express = require("express");
const pool = require("../model/pgDatabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();




authRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Peticion invalida" });
    }
    try {
        const sql = "SELECT * FROM users WHERE username=$1"
        const results = await pool.query(sql, [username]);

        if (results.rows.length === 0) {
            return res.status(401).json({ error: "Credenciales invalidos." });
        }

        const user = results.rows[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: "Credenciales invalidos." });
        }

        delete user.password;

        const jwtToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" })

        req.session.user = user;
        req.session.token = jwtToken;
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

authRouter.get("/session", (req, res)=>{
    if (req.session.user){
        res.json({
            user: req.session.user,
            token: req.session.token
        })
    } else {
        res.status(401).json({
            user: null
        })
    }
})

authRouter.post("/logout", (req, res)=> {
    req.session.destroy(() =>{
        res.clearCookie("connect.sid");
        res.json({message: "Sesion cerrada"})
    })
})

module.exports = authRouter;