import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';

function StudentAddCert(){

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

    const handleInput = (e) => {
        setSelectedCertificate(e.target.value);
    };

    let {id} = useParams();

    const [student, setStudent] = useState({});
    const [certificates, setCertificates] = useState([]);
    const [selectedCertificate, setSelectedCertificate] = useState();

    const saveRelation = (e) => {
        e.preventDefault();

        const data={
            studentID: student.usuarioID,
            certID: selectedCertificate
        }

        axios.post(`http://localhost:8081/relations`, data, headers)
        .then(res => {
            if (res.status===201){
                alert(res.data.message);
                navigate('/students');
            } else if (res.status === 409){
                alert(res.data.message);
            }
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
            const certificatesData = res.data.message;
            setCertificates(certificatesData);

            if(certificatesData.length > 0){
                setSelectedCertificate(certificatesData[0].certificadoID);
            }
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