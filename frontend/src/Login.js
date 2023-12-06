import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import {Link} from 'react-router-dom'
import Validation from './LoginValidation';
import axios from 'axios';

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

    const handleSubmit =(event) => {
        event.preventDefault();
        const err = Validation(values); 
        setErrors(err);
    }

    useEffect(() => {
        if(errors.email === "" && errors.password ===""){
            axios.post('http://localhost:8081/user/login', values)
            .then(res => {
                if(res.data.code === 200){
                    localStorage.setItem("token", res.data.message);
                    navigate('/home');
                } else if (res.data.code === 401) {
                    alert("Usuario y/o contraseña incorrecto. Por favor intente de nuevo.");
                } else {
                    alert("Ha ocurrido un error. Por favor, intente de nuevo.");
                }
            })
            .catch(err => console.log(err));
        }
    }, [errors]);
    

    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form action='' onSubmit={handleSubmit}>
                    <div className='border-bottom mb-4'>
                        <h1>Login</h1>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>ID</strong></label>
                        <input type='number' placeholder='Enter email' name='email'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' placeholder='Enter password' name='password'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'> <strong>Log in </strong></button>
                    <p>You are agree to our terms and policies</p>

                </form>
            </div>

        </div>
    )
}

export default Login