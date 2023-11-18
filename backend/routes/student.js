const express = require('express');
const student = express.Router();
const db = require('../config/database');

student.get('/', async (req,res,next)=>{
    const stndt = await db.query("SELECT * FROM usuarios WHERE rol = 'Estudiante'");
    return res.status(200).json({code:200,message:stndt});
})

//Buscar por ID
student.get('/:id([0-9]{1,6})', async (req,res,next) => {
    const id = req.params.id;
    try {
        const stdnt = await db.query("SELECT * FROM usuarios WHERE usuarioID = ? AND rol = 'Estudiante'", [id]);
        if(stdnt.length == 1){
            return res.status(200).json({code:200,message:stdnt});
        }
        return res.status(404).json({code:404,message:"Estudiante no encontrado."});
    } catch(err) {
        console.error(err);
        return res.status(500).json({code:500, message:"Error interno del servidor."});
    }
});

module.exports = student;