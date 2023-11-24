import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Students from './pages/Students';
import Certificates from './pages/Certificates';
import CreateCertificate from './pages/CreateCertificate';
import EditCertificate from './pages/EditCertificate';
import ErrorBoundary from './ErrorBoundary';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RequireAuth from 'react-auth-kit';
import AuthProvider from 'react-auth-kit/AuthProvider';

export default function App(){
  return(
    <AuthProvider store={'token'} authType = { 'cookie' } authName = { '_auth' } cookieDomain={window.location.hostname} cookieSecure={false}>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={
              <ErrorBoundary fallback = "error en /"><Login/></ErrorBoundary>}> 
            </Route>

            <Route path='/login' element={
              <ErrorBoundary fallback = "error en /login"><Login/></ErrorBoundary>}> 
            </Route>

            <Route path='/home' element={
              <RequireAuth loginPath="/login"> <ErrorBoundary fallback = "error en /home"><Home/></ErrorBoundary></RequireAuth>}> 
            </Route>

            <Route path='/students' element={
              <RequireAuth loginPath="/login"><ErrorBoundary fallback = "error en /students"> <Students/></ErrorBoundary></RequireAuth>}>
            </Route>
              
            <Route path='/certificates' element={
              <RequireAuth loginPath="/login"> <ErrorBoundary fallback = "error en /certificates"></ErrorBoundary> <Certificates/></RequireAuth>}>
            </Route>

            <Route path='/certificates/create' element={
              <RequireAuth loginPath="/login"><ErrorBoundary fallback = "error en /certificates/create"></ErrorBoundary><CreateCertificate/></RequireAuth>}> 
            </Route>
            
            <Route path='/certificates/edit/:id' element={
              <RequireAuth loginPath="/login"><ErrorBoundary fallback = "error en /certificates/edit/:id"> </ErrorBoundary><EditCertificate/></RequireAuth>}> 
            </Route>

        </Routes>
      </BrowserRouter>

    </AuthProvider>
  )
}

