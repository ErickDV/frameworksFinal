import React from 'react'
import {getAuthHeaders} from './GetAuthHeaders';
import { Link, useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();
    
    const headers = getAuthHeaders();
    if (!headers) {
        navigate('/login');
    }
    
    const handleCert =(event) => {
        event.preventDefault();
        navigate('/certificates')
    }
    const handleStudent =(event) => {
        event.preventDefault();
        navigate('/students')
    }

    return (
        <div  className='d-flex flex-row justify-content-center align-items-center bg-light vh-100'>
            <div className='border border-dark p-4 rounded w-x clearfix'>
                <div className='border-bottom mb-3'>
                    <h1>Bienvenido(a)</h1>
                </div>
                <div className='mb-3'>
                    <form onSubmit={handleCert}>
                        <button className='btn btn-primary w-100'>Certificados</button>
                    </form>
                </div>
                <div className='mb-3'>
                    <form onSubmit={handleStudent}>
                        <button className='btn btn-primary w-100'>Alumnos</button>
                    </form>
                </div>
                <Link to="/login" className='btn btn-danger float-end  w-100'>Salir</Link>
            </div>
        </div>
    )
}

export default Home