import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import useAuth from './hooks/useAuth';

function Login(){
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

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
                    const accessToken = res.data.token;
                    const role = res.data.role
                    setAuth({role, accessToken})
                    navigate(from, {replace: true});
                } else {
                    alert("Usuario y/o contraseña incorrecto. Por favor intente de nuevo.");
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