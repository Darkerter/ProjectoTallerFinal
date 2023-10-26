const express = require('express')
const administradores = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');

administradores.get('/', async(req,res,next)=>{
    const administradores = await  db.query("SELECT * FROM administradores");
    return res.status(200).json({code:200, message:administradores});
    
});
administradores.post('/login', async(req,res,next)=>{
    
        const{user_name,user_password} = req.body;
        const query = `SELECT * FROM administradores WHERE user_name = '${user_name}' AND user_password ='${user_password}'`;
        const rows = await db.query(query);

        if(user_name && user_password){
            if(rows.length == 1){
                const token = jwt.sign({
                    user_id: rows[0].user_id,
                    user_name: rows[0].user_name
                }, "debugkey");
                return res.status(200).json({code:201, message:token });
            }else{
                return res.status(400).json({code:401,message:"Usuario y/o contraseña incorrecta"});
            }
        }
        return res.status(500).json({code:500,message:"Campos incompletos"});
    
});

module.exports = administradores;