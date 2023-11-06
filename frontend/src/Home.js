import React from 'react'
import { useNavigate } from 'react-router-dom';


function Home() {

    const navigate = useNavigate();
    
    const handleCert =(event) => {
        event.preventDefault();
        navigate('/certificates')
    }
    const handleStudent =(event) => {
        event.preventDefault();
        navigate('/students')
    }

    return (
        <div>
            <p>Home</p>
            <form onSubmit={handleCert}>
                <button>Certificados</button>
            </form>
            <form onSubmit={handleStudent}>
                <button>Alumnos</button>
            </form>
        </div>
    )
}

export default Home