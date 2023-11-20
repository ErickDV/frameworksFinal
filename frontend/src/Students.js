import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

function Students() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/student`).then(res => {
            console.log("Prueba");
            console.log(res.data.message);
            setStudents(res.data.message);
        });
        
    }, [])

    var studentDetails = "";
    studentDetails = students.map( (item,index) => {
        return (
            <tr key={index}>
                <td>{item.usuarioID}</td>
                <td>{item.nombre}</td>
                <td>{item.apellidos}</td>
                <td>
                    <div className='text-center'>
                        <Link to={`/students/details/${item.usuarioID}`} className='btn btn-success'>Detalles</Link>
                    </div>
                </td>
                <td>
                    <div className='text-center'>
                        <Link to={`/students/addCert/${item.usuarioID}`} className='btn btn-primary'>Agregar</Link>
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
                            <h4 className='mb-4'>Lista de estudiantes
                                <Link to="/home" className='btn btn-danger float-end'>Volver</Link>
                            </h4>
                        </div>
                        <div className='card-body'>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Expediente</th>
                                        <th>Nombre</th>
                                        <th>Apellidos</th>
                                        <th>
                                        <div className='text-center'>
                                            Detalles
                                        </div>
                                        </th>
                                        <th>
                                        <div className='text-center'>
                                            Agregar certificado
                                        </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Students