import React, {useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';

function CreateCertificate() {

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

    const [certificate, setCertificate] = useState({
        name: '',
        startDate: '',
        endDate: '',
        skills: ''
    })

    const handleInput = (e) => {
        e.persist();
        setCertificate({...certificate, [e.target.name]: e.target.value});
    }

    const saveCertificate = (e) => {
        e.preventDefault();

        const data ={
            name: certificate.name,
            startDate: certificate.startDate,
            endDate: certificate.endDate,
            skills: certificate.skills,
        }

        axios.post(`http://localhost:8081/certificate`, data,headers)
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
                            <h4 className='mb-4'>Añadir certificado
                                <Link to="/certificates" className='btn btn-danger float-end'>Volver</Link>
                            </h4>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={saveCertificate}>
                                <div className='mb-3'>
                                    <label>Nombre</label>
                                    <input type='text' name='name' value={certificate.name} required onChange={handleInput} className='form-control'/>
                                </div>
                                <div className='mb-3'>
                                    <label>Fecha de inicio</label>
                                    <input type='date' name='startDate' value={certificate.startDate} required onChange={handleInput} className='form-control'/>
                                </div>
                                <div className='mb-3'>
                                    <label>Fecha de fin</label>
                                    <input type='date' name='endDate' value={certificate.endDate} required onChange={handleInput} className='form-control'/>
                                </div>
                                <div className='mb-3'>
                                    <label>Habilidades</label>
                                    <input type='text' name='skills' value={certificate.skills} required onChange={handleInput} className='form-control'/>
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

export default CreateCertificate;