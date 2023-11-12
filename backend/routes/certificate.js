const express = require('express');
const certificate = express.Router();
const db = require('../config/database');

certificate.get('/', async (req,res,next)=>{
    const stndt = await db.query("SELECT * FROM certificados");
    return res.status(200).json({code:200,message:stndt});
})

//Buscar por ID
certificate.get('/:id([0-9])', async (req,res,next) => {
    const id = req.params.id;
    try {
        const crtf = await db.query("SELECT * FROM certificados WHERE certificadoID = ?", [id]);
        if(crtf.length == 1){
            return res.status(200).json({code:200,message:crtf});
        }
        return res.status(404).json({code:404,message:"Certificado no encontrado."});
    } catch(err) {
        console.error(err);
        return res.status(500).json({code:500, message:"Error interno del servidor."});
    }
});

//Agregar certificado
certificate.post("/", async (req, res, next) => {
    const {name,startDate, endDate, skills} = req.body;
    if(name && startDate && endDate && skills){
        let query = `INSERT INTO certificados(nombre, fechaInicio, fechaFin, habilidades) `;
        query += `VALUES('${name}','${startDate}','${endDate}','${skills}')`;
        
        const rows = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: 'Registro del certificado exitoso'});
        }
        return res.status(500).json({code: 500, message: 'Hubo un error al realizar la operacion'});
    }
    return res.status(500).json({code: 500, message: 'Campos incompletos'});
});


module.exports = certificate;