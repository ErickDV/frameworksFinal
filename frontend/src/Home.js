import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';

export default function Home() {

    const navigate = useNavigate();
    
    const handleCert =(event) => {
        event.preventDefault();
        navigate('/certificates')
    }
    const handleStudent =(event) => {
        event.preventDefault();
        navigate('/students')
    }

    const singOut = useSignOut();
    const logout = () => {
        singOut();
        navigate('/login')
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
                <form onSubmit={logout}>
                    <button className='btn btn-danger w-100'>Salir</button>
                </form>
            </div>
        </div>
    )
}
