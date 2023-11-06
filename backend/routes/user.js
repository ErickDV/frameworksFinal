const express = require('express');
const user = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');

user.post('/login', (req,res,next)=>{
    const sql = "SELECT * FROM usuarios WHERE `usuarioID` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) =>{
        if(err) {
            return res.json("Error");
        } if (data.length > 0){
            return res.json("Success");
        } else {
            return res.json("Fail");
        }
    })

})

module.exports = user;