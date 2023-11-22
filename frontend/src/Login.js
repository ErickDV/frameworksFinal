import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import {useAuth0} from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';

function Login(){
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
   
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput =(event)=>{
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    
    
    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-20'>
                <div className='border-bottom mb-4'>
                    <h1>Bienvenido</h1>
                </div>
                <LoginButton></LoginButton>
            </div>

        </div>
    )
}

export default Login