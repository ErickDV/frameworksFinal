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
            const id = data[0].usuarioID;
            const role = data[0].rol;
            const token = jwt.sign({id},"debugkey",{});
            const roleToken = jwt.sign({role},"debugkey",{});
            return res.status(200).json({code:200, token:token, roleToken:roleToken});
        } else {
            return res.status(200).json({code:401,message:"Usuario y/o contraseña incorrectos."});
        }
    })

})

module.exports = user;