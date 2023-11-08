import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

function CreateCertificate() {
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
                            <form>
                                <div className='mb-3'>
                                    <label>Nombre</label>
                                    <input type='text' name='name' className='form-control'/>
                                </div>
                                <div className='mb-3'>
                                    <label>Fecha de inicio</label>
                                    <input type='date' name='startDate' className='form-control'/>
                                </div>
                                <div className='mb-3'>
                                    <label>Fecha de fin</label>
                                    <input type='date' name='endDate' className='form-control'/>
                                </div>
                                <div className='mb-3'>
                                    <label>Habilidades</label>
                                    <input type='text' name='skills' className='form-control'/>
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