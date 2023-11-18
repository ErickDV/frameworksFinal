import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';
import axios from 'axios';

function Login(){
    const signIn = useSignIn();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("values: ", values);
        try {
            const response = await axios.post('http://localhost:8081/user/login', values).then((res) => {
                if(response.data.code === 200){
                    signIn(
                    {
                        token: response.data.token,
                        expiresIn: 3600,
                        tokenType: "Bearer",
                        authState: response.data.user_id
                    }
                    );
                    navigate('/home');
                } else {
                    alert("No record existed");
                }
            })
        } catch (err){
            console.log(err);
        }
      
    }    

    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form action='' onSubmit={onSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>ID</strong></label>
                        <input type='number' placeholder='Enter email' name='email'
                         className='form-control rounded-0'/>
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' placeholder='Enter password' name='password'
                        className='form-control rounded-0'/>
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