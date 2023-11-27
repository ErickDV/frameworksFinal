import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';

const StudentHome = () => {
    const [certificates, setCertificates] = useState({})
    const id = localStorage.getItem("id")
    
    useEffect(() =>{
        axios.post('http://localhost:8081/studentD/getC',{id:id})
        .then(res=>{
            const idC = res.data.message
            console.log(res)
            axios.post('http://localhost:8081/studentD/getCI',{id:idC})
            .then(res2=>{
                console.log("antesarray")
                console.log(res2[0])
                const certificateData = res2.data.message
                setCertificates(certificateData)
                console.log(certificates)
            })           
        })
    }, [id])

    console.log(certificates, "porno")
    
    var certificatesDetails = "";
    if (certificates.length === 0){
        certificatesDetails = "No se encontraron registros";
    } else {
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
                    {/* <td>
                        <div className='text-center'>
                            <Link to={`/certificates/edit/${item.certificadoID}`} className='btn btn-success'>Editar</Link>
                        </div>
                    </td> */}
                </tr>
            )
        });
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='mb-4'>Detalles estudiante
                                <Link to="/login" className='btn btn-danger float-end'>Salir</Link>
                            </h4>
                        </div>
                        <div className='card-body'>
                        
                            <h4 className='mb-4 mt-4'>Certificados</h4>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Inicio</th>
                                        <th>Fin</th>
                                        <th>Habilidades</th>
                                        {/* <th>
                                            <div className='text-center'>
                                                Eliminar
                                            </div>
                                        </th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {typeof certificatesDetails === 'string' ? 
                                        <tr>
                                            <td colSpan="5">{certificatesDetails}</td>
                                        </tr> 
                                        : 
                                        certificatesDetails
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default StudentHome