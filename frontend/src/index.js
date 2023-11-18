import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from 'react-auth-kit';
import ErorrBoundary from './ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <ErorrBoundary fallback = "hubo un error en authprovider">
      <AuthProvider store={'token'} authType = { 'cookie' } authName = { '_auth' } cookieDomain={window.location.hostname} cookieSecure={false}>
        <ErorrBoundary fallback = "hubo un error en app">
          <App/>
        </ErorrBoundary>
      </AuthProvider>
    </ErorrBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
