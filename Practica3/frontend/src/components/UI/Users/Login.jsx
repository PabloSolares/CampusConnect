import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
export default function Login() {
    const[reg, setReg] = useState('');
    const[password, setPassword] = useState('');
    const[errorMsg, seterrorMsg] = useState('');
    const[successMsg, setsuccessMsg] = useState('');

    const navigate = useNavigate();
    const handleSubmit  =  (e) => {
       e.preventDefault();
        seterrorMsg("");  
        setsuccessMsg(""); 
    

       (async () => {
            try {
                const response = await axios.post('http://localhost:4000/usuarios/login', {
                    registro_academico: reg,
                    password: password
                });
                
                if(response.status === 200){
                    localStorage.clear();
                    localStorage.setItem("usuario", response.data.token.id_usuario);
                    setsuccessMsg(response.data.message || "Login exitoso ");
      navigate('/menu');

                }
            } catch (error) {
                if(error.response){
                    seterrorMsg(error.response.data.error || "Error en el login ");
                } else {
                    seterrorMsg("Error de conexión con el servidor ");
                }
            }
       })()
    }


    return (
        <div className="vh-100 d-flex justify-content-center align-items-center bg-gradient bg-primary bg-opacity-75">
        <div className="card shadow-lg border-0 rounded-4 p-4" style={{ width: "25rem" }}>
            <h2 className="text-center fw-bold mb-4 text-primary">Bienvenido </h2>
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}
            <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="registro" placeholder="Registro Academico" autoComplete="off" onChange={(e) => setReg(e.target.value)} />
                <label htmlFor="registro">Registro Academico</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="password">Contraseña</label>
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2 rounded-3 fw-semibold">
                Iniciar Sesión
            </button>
            </form>
            <hr />
            <div className="d-flex justify-content-between mt-2">
            <Link to="/register" className="text-decoration-none"> Registrarse</Link>
            <Link to="/recover" className="text-decoration-none"> ¿Olvidaste tu contraseña?</Link>
            </div>
        </div>
        </div>
    );
}

