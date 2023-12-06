const express = require('express');
const studentHome = express.Router();
const db = require('../config/database');

//Buscar por ID
studentHome.get('/:id([0-9]{1,6})', async (req,res,next) => {
    const id = req.params.id;
    if(req.user.id != id){
        return res.status(403).json({ message: 'No tienes permiso para acceder a estos datos' });
    }
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

//Obtener certificados a traves de ID de usuario
studentHome.get('/relations/:id([0-9]{1,6})', async (req,res,next) => {
    const id = req.params.id;
    try {
        let query = "SELECT c.certificadoID, c.nombre, c.fechaInicio, c.fechaFin, c.habilidades ";
        query += "FROM usuarios u ";
        query += "JOIN relaciones r ON u.usuarioID = r.alumnoID ";
        query += "JOIN certificados c ON r.certificadoID = c.certificadoID ";
        query += "WHERE u.usuarioID = ?";
        const rltns = await db.query(query, [id]);
        if(rltns.length >= 1){
            return res.status(200).json({code:200,message:rltns});
        }
        //Añadir mensaje para controlar que el alumno no tiene certificados.
        return res.status(404).json({code:404,message:"Certificado no encontrado."});
    } catch(err) {
        console.error(err);
        return res.status(500).json({code:500, message:"Error interno del servidor."});
    }
});

module.exports = studentHome;