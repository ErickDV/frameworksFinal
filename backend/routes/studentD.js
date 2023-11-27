const express = require('express');
const studentD = express.Router();
const db = require('../config/database');

studentD.post('/getC', (req,res,next)=>{
    db.query(`SELECT certificadoID FROM relaciones WHERE alumnoID = ?`, [req.body.id], (err,data)=>{
        if(!data){
            return res.json({code: 210, message: "sin certificados"})
        }else{
            return res.json({code: 200, message: data[0].certificadoID}) 
        }
    });
})

studentD.post('/getCI', (req, res,next) =>{
    db.query('SELECT * FROM certificados WHERE certificadoID = ?', [req.body.id], (err,data) =>{
        if(!data){
            return res.json({code: 400, message: "no existe este certificado"})
        }else{
            return res.json({code: 200, message: data})
        }
    })
})

module.exports = studentD;