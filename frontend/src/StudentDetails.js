import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';

function StudentDetails() {

    let {id} = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState({});
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/student/${id}`).then(res => {
            console.log("Prueba");
            console.log(res.data.message[0]);
            const studentData = res.data.message[0];
            setStudent(studentData);
        });

        axios.get(`http://localhost:8081/relations/${id}`).then(res => {
            const certificatesData = res.data.message;
            setCertificates(certificatesData);
        });

    }, [id]);

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
                {/* <td>
                    <div className='text-center'>
                        <Link to={`/certificates/edit/${item.certificadoID}`} className='btn btn-success'>Editar</Link>
                    </div>
                </td> */}
            </tr>
        )
    });

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='mb-4'>Detalles estudiante
                                <Link to="/students" className='btn btn-danger float-end'>Volver</Link>
                            </h4>
                        </div>
                        <div className='card-body'>
                            <form>
                                <div className='mb-3'>
                                    <label>ID</label>
                                    <input type='text' required className='form-control' value={student.usuarioID} readOnly/>
                                </div>
                                <div className='mb-3'>
                                    <label>Nombre</label>
                                    <input type='text' required className='form-control' value={student.nombre} readOnly/>
                                </div>
                                <div className='mb-3'>
                                    <label>Apellidos</label>
                                    <input type='text' value={student.apellidos} required className='form-control' readOnly/>
                                </div>
                            </form>
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

export default StudentDetails;