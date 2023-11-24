import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';
import axios from 'axios';
import SignIn from '../SignIn';

function Login(){


    return(
     <SignIn></SignIn>
    )
}

export default Login