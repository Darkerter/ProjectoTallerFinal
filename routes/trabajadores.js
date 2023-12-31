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

trabajadores.delete('/:id([0-9]{1,3})', async(req,res,next)=>{
    const query =`DELETE FROM trabajadores WHERE trabajadorId = ${req.params.id}`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1){
        return res.status(200).json({code:201,message:"trabajador borrado correctamente"});
    }
        return res.status(404).json({code:404,message:"trabajador no encontrado"})

});

trabajadores.put ('/:id([0-9]{1,3})', async(req,res,next)=>{
        
    const {nombre,apellido,telefono,correo,dirrecion} = req.body;
    if(correo && apellido && nombre && telefono && dirrecion){
        let query = `UPDATE trabajadores SET nombre='${nombre}', apellido= '${apellido}' ,`;
        query += `telefono= ${telefono},correo=' ${correo}',dirrecion= '${dirrecion}' WHERE trabajadorId=${req.params.id}`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({code:201,message:"trabajador actualizado correctamente"}); 
        }
        
        return res.status(500).json({code:500,message:"ocurrio un error"});
        
    }
    return res.status(500).json({code:500,message:"Campos incompletos"});

    
});

trabajadores.get('/:name([A-Za-z]+)', async(req,res,next)=>{
    const name =req.params.name;
    const trabajador = await  db.query("SELECT * FROM trabajadores WHERE nombre='"+ name +"';");
    
    if(trabajador.length > 0)  
    return res.status(200).json({code:200, message:trabajador})

    return res.status(404).send({code:404, message:"trabajador no encontrado"});

});

module.exports = trabajadores;