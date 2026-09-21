const express = require("express"); 
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(helmet())
app.use(express.json());
app.use(morgan("dev"));


app.listen(PORT, ()=> { 
    console.log(`Server listening on http://localhost:${PORT}`)
});