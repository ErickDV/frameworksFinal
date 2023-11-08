import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';

function EditCertificate() {

    let {id} = useParams();

    const [certificate, setCertificate] = useState([]);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");


    useEffect(() => {
        axios.get(`http://localhost:8081/certificate/${id}`).then(res => {
            console.log("Prueba");
            console.log(res.data.message);
            setCertificate(res.data.message);
    
            var fechaInicio = new Date(res.data.message[0].fechaInicio);
            var fechaFin = new Date(res.data.message[0].fechaFin);
    
            setFechaInicio(fechaInicio.toISOString().split('T')[0]);
            setFechaFin(fechaFin.toISOString().split('T')[0]);
        });
        
    }, [])


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
                            <form>
                                <div className='mb-3'>
                                    <label>ID</label>
                                    <input type='text' name='idCert' className='form-control' value={certificate[0] ? certificate[0].certificadoID : ''} aria-label="readonly input example" readOnly/>
                                </div>
                                <div className='mb-3'>
                                    <label>Nombre</label>
                                    <input type='text' name='name' className='form-control' value={certificate[0] ? certificate[0].nombre : ''}/>
                                </div>
                                <div className='mb-3'>
                                    <label>Fecha de inicio</label>
                                    <input type='date' name='startDate' className='form-control' value={fechaInicio}/>
                                </div>
                                <div className='mb-3'>
                                    <label>Fecha de fin</label>
                                    <input type='date' name='endDate' className='form-control' value={fechaFin}/>
                                </div>
                                <div className='mb-3'>
                                    <label>Habilidades</label>
                                    <input type='text' name='skills' className='form-control' value={certificate[0] ? certificate[0].habilidades : ''}/>
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