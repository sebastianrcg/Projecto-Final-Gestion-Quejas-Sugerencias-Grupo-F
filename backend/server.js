require("dotenv").config();

const express = require("express"); 
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");

const authRouter = require("./routes/auth.js");
const usuariosRouter = require('./routes/usuarios.js');
const quejasRouter = require("./routes/quejas.js");



const app = express();

const PORT = process.env.PORT || 5000;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24    
        // 1 day cookie
    }
}));


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/usuarios", usuariosRouter);
app.use("/quejas", quejasRouter);


app.listen(PORT, ()=> { 
    console.log(`Server listening on http://localhost:${PORT}`)
});