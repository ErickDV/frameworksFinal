const express = require('express');
const relations = express.Router();
const db = require('../config/database');

relations.get('/', async (req,res,next)=>{
    const rltns = await db.query("SELECT * FROM relaciones");
    return res.status(200).json({code:200,message:rltns});
});

//Obtener certificados a traves de ID de usuario
relations.get('/:id([0-9]{1,6})', async (req,res,next) => {
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

//Agregar relacion
relations.post("/", async (req, res, next) => {
    const {studentID,certID} = req.body;
    if(studentID && certID){
        let existQuery = `SELECT * FROM relaciones WHERE alumnoID = ${studentID} AND certificadoID = ${certID}`;
        const existRows = await db.query(existQuery);
        if (existRows.length>0){
            return res.status(409).json({code:409,message: 'El estudiante ya cuenta con ese certificado.'}); 
        } //Si la relacion no existe puede pasar al sig. codigo

        let query = `INSERT INTO relaciones(alumnoID, certificadoID) `;
        query += `VALUES(${studentID},${certID})`;
        
        const rows = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: 'Certificado añadido correctamente.'});
        }
        return res.status(500).json({code: 500, message: 'Hubo un error al realizar la operacion'});
    }
    return res.status(500).json({code: 500, message: 'Campos incompletos'});
});

module.exports = relations  ;