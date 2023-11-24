import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';

function EditCertificate() {

    let {id} = useParams();
    const navigate = useNavigate();


    const [certificate, setCertificate] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8081/certificate/${id}`).then(res => {
            console.log("Prueba");
            console.log(res.data.message[0]);
            const certificateData = res.data.message[0];

            // Convertir las fechas a formato ISOString
            certificateData.fechaInicio = new Date(certificateData.fechaInicio).toISOString().split('T')[0];
            certificateData.fechaFin = new Date(certificateData.fechaFin).toISOString().split('T')[0];

            // Actualizar el estado certificate con las fechas en formato ISOString
            setCertificate(certificateData);
            console.log("Prueba");
        });
        
    }, [id]);

    const handleInput = (e) => {
        e.persist();
        setCertificate({...certificate, [e.target.name]: e.target.value});
    }

    const updateCertificate = (e) => {
        e.preventDefault();

        const data ={
            certID: certificate.certificadoID,
            name: certificate.nombre,
            startDate: certificate.fechaInicio,
            endDate: certificate.fechaFin,
            skills: certificate.habilidades
        }

        axios.patch(`http://localhost:8081/certificate`, data)
        .then(res => {
            alert(res.data.message);
            navigate('/certificates');
        })
        .catch(function (error) {
            if(error.response){
                alert(error.response.data.message);
            }
        });
    }


    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='mb-4'>Editar certificado
                                <Link to="/certificates" className='btn btn-danger float-end'>Volver</Link>
                            </h4>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={updateCertificate}>
                                <div className='mb-3'>
                                    <label>ID</label>
                                    <input type='text' name='certificadoID' required className='form-control' value={certificate.certificadoID} readOnly/>
                                </div>
                                <div className='mb-3'>
                                    <label>Nombre</label>
                                    <input type='text' name='nombre' required onChange={handleInput} className='form-control' value={certificate.nombre}/>
                                </div>
                                <div className='mb-3'>
                                    <label>Fecha de inicio</label>
                                    <input type='date' name='fechaInicio' required onChange={handleInput} className='form-control' value={certificate.fechaInicio}/>
                                </div>
                                <div className='mb-3'>
                                    <label>Fecha de fin</label>
                                    <input type='date' name='fechaFin' required onChange={handleInput} className='form-control' value={certificate.fechaFin}/>
                                </div>
                                <div className='mb-3'>
                                    <label>Habilidades</label>
                                    <input type='text' name='habilidades' value={certificate.habilidades} required onChange={handleInput} className='form-control' />
                                </div>
                                <div className='text-center mb-3'>
                                    <button type='submit' className='btn btn-primary'>Guardar cambios</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCertificate;