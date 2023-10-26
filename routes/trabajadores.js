const express = require('express')
const trabajadores = express.Router();
const db = require('../config/database');

trabajadores.post("/", async(req,res,next)=>{
    const {nombre,apellido,telefono,correo,dirrecion} = req.body;

    if(correo && apellido && nombre && telefono && dirrecion){
        
        let query = "INSERT INTO trabajadores (nombre, apellido, telefono, correo , dirrecion)";
        query += `VALUES('${nombre}','${apellido}',${telefono},'${correo}','${dirrecion}')`;
        
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({code:201,message:"trabajador insertado correctamente"}); 
        }
        
        return res.status(500).json({code:500,message:"ocurrio un error"});
        
    }
    return res.status(500).json({code:500,message:"Campos incompletos"});

});

module.exports = trabajadores;