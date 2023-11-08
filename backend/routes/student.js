const express = require('express');
const student = express.Router();
const db = require('../config/database');

student.get('/', async (req,res,next)=>{
    const stndt = await db.query("SELECT * FROM usuarios WHERE rol = 'Estudiante'");
    return res.status(200).json({code:200,message:stndt});
})

module.exports = student;