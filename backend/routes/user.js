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
            const JWTtoken = jwt.sign({
                user_id: data[0].usuarioID
            },"token");
            const role = data[0].rol;
            return res.json({code: 200, mesagge: 'welcome back' ,token: JWTtoken, role: role});
        } else {
            return res.json({code: 400, mesagge: 'quien chota sos'});
        }
    })
})

module.exports = user;