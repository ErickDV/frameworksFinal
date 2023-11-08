import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

function Certificates() {

    const [certificates, setCertificate] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/certificate`).then(res => {
            console.log("Prueba");
            console.log(res.data.message);
            setCertificate(res.data.message);
        });
        
    }, [])

    var certificatesDetails = "";
    certificatesDetails = certificates.map( (item,index) => {
        var fechaInicio = new Date(item.fechaInicio);
        var fechaFin = new Date(item.fechaFin);

        return (
            <tr key={index}>
                <td>{item.certificadoID}</td>
                <td>{item.nombre}</td>
                <td>{fechaInicio.toLocaleDateString()}</td>
                <td>{fechaFin.toLocaleDateString()}</td>
                <td>{item.habilidades}</td>
                <td>
                    <div className='text-center'>
                        <Link to="/" className='btn btn-primary'>Editar</Link>
                    </div>
                </td>
            </tr>
        )
    });

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='mb-4'>Lista de certificados
                            </h4>
                            <h4>
                                <Link to="/home" className='btn btn-danger float-start'>Volver</Link>
                                <Link to="/home" className='btn btn-success float-end'>Añadir certificado</Link>
                            </h4>
                        </div>
                        <div className='card-body'>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Inicio</th>
                                        <th>Fin</th>
                                        <th>Habilidades</th>
                                        <th>
                                            <div className='text-center'>
                                                Editar
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {certificatesDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Certificates