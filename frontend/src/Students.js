import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

function Students() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/student`).then(res => {
            console.log(res.data.message)
            setStudents(res.data.message);
        });
        
    }, [])

    var studentDetails = "";
    studentDetails = students.map( (item,index)=> {
        return (
            <tr key={index}>
                <td>{item.usuarioID}</td>
                <td>{item.nombre}</td>
                <td>{item.apellidos}</td>
                <td>
                    <Link to="/" className='btn btn-success'>Editar</Link>
                </td>
                <td>
                    <Link to="/" className='btn btn-success'>Agregar</Link>
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
                            <h4>Students List
                                <Link to="/" className='btn btn-primary float-end'>Volver</Link>
                            </h4>
                        </div>
                        <div className='card-body'>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Edit</th>
                                        <th>Add</th>
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
            <p>Home</p>
        </div>
    )
}

export default Students