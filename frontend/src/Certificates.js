import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import axios from 'axios';

function Certificates() {

    const navigate = useNavigate();
    var headers = {};

    //Obtener el token desde headers
    if(localStorage.getItem("token")){
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
    }else{
        //Regresar en caso de no existir token
        navigate('/home');
    }

    const [certificates, setCertificate] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/certificate`,headers).then(res => {
            setCertificate(res.data.message);
        })
        .catch(err => {
            //Regresar al login en caso de no estar autorizado
            navigate('/home');
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
                        <Link to={`/certificates/edit/${item.certificadoID}`} className='btn btn-success'>Editar</Link>
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
                            <h4 className='mb-3'>Lista de certificados
                            </h4>
                            <h4>
                                <Link to="/certificates/create" className='btn btn-primary float-start'>Añadir certificado</Link>
                                <Link to="/home" className='btn btn-danger float-end mb-3'>Volver</Link>
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