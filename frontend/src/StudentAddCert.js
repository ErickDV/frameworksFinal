import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';

function StudentAddCert(){

    const handleInput = (e) => {
        setSelectedCertificate(e.target.value);
    };

    let {id} = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState({});
    const [certificates, setCertificates] = useState([]);
    const [selectedCertificate, setSelectedCertificate] = useState();

    const saveRelation = (e) => {
        e.preventDefault();

        const data={
            studentID: student.usuarioID,
            certID: selectedCertificate
        }

        axios.post(`http://localhost:8081/relations`, data)
        .then(res => {
            alert(res.data.message);
            navigate('/students');
        })
        .catch(function (error) {
            if(error.response){
                alert(error.response.data.message);
            }
        });
    }

    useEffect(() => {

        //Obtener info del estudiante
        axios.get(`http://localhost:8081/student/${id}`).then(res => {
            const studentData = res.data.message[0];
            setStudent(studentData);
        })
        .catch(error => {
            alert("Hubo un error al cargar los datos. ",error);
        });

        //Obtener info de los certificados
        axios.get(`http://localhost:8081/certificate`).then(res => {
            setCertificates(res.data.message)
        })
        .catch(error => {
            alert("Hubo un error al cargar los datos. ",error);
        });
    }, [id]);

    var certificatesDetails = "";
    certificatesDetails = certificates.map(result => ({id:result.certificadoID, nombre:result.nombre}));
    console.log(certificatesDetails);

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='mb-4'>Agregar certificado
                                <Link to="/students" className='btn btn-danger float-end'>Volver</Link>
                            </h4>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={saveRelation}>
                                <div className='mb-3'>
                                    <label>ID</label>
                                    <input type='number' name='studentID' value={student.usuarioID} required className='form-control'/>
                                </div>
                                <div className='mb-3'>
                                    <label>Nombre</label>
                                    <input type='text' name='studentName' value={student.nombre} required className='form-control'/>
                                </div>
                                <div className='mb-3'>
                                    <label>Certificado</label>
                                    <select className='form-control' onChange={handleInput}>
                                        {certificatesDetails.map((certificado,index) =>(
                                            <option key={index} value={certificado.id}>
                                                {certificado.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {/* <input type='select' name='endDate' value={student.nombre} required onChange={handleInput} className='form-control'/> */}
                                </div>
                                <div className='text-center mb-3'>
                                    <button type='submit' className='btn btn-primary'>Añadir certificado</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentAddCert;