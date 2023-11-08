const express = require('express');
const certificate = express.Router();
const db = require('../config/database');

certificate.get('/', async (req,res,next)=>{
    const stndt = await db.query("SELECT * FROM certificados");
    return res.status(200).json({code:200,message:stndt});
})

module.exports = certificate;