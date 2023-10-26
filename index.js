const express = require("express");
const app = express()

const trabajadores = require('./routes/trabajadores');
const administradores = require('./routes/administradores');


const auth = require('./middleware/auth');
const cors = require('./middleware/cors');

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admines",administradores);
app.use(auth);

app.use("/trabajadores",trabajadores);

app.listen(process.env.PORT || 4000,()=>{
    console.log("Server is running");
});