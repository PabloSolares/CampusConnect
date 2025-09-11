import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Recuperar() {
        const[reg, setReg] = useState('');
        const[password, setPassword] = useState('');
            
        const[correo, setCorreo] = useState('');
        
        const[errorMsg, seterrorMsg] = useState('');
        const[successMsg, setsuccessMsg] = useState('');
    const handleSubmit  =  (e) => {
        e.preventDefault();
            seterrorMsg("");  
            setsuccessMsg(""); 

        (async () => {
                try {
                    const response = await axios.post('http://localhost:4000/usuarios/recuperarPass', {
                        registro_academico: reg,
                        email: correo,
                        password: password
                    });
                    
                    if(response.status === 202){
                
                        setsuccessMsg(response.data.message || "Contraseña Actualizada Correctamente ");
                    }
                } catch (error) {
                    console.log(error);
                    if(error.response){
                        seterrorMsg(error.response.data.message || "Error al actualizar la contraseña ");
                    } else {
                        seterrorMsg("Error de conexión con el servidor ");
                    }
                }
        })()
        }

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center bg-gradient bg-warning bg-opacity-75">
        <div className="card shadow-lg border-0 rounded-4 p-4" style={{ width: "25rem" }}>
            <h2 className="text-center fw-bold mb-4 text-warning">Recuperar Acceso </h2>
            
            <p className="text-muted text-center">Ingresa tu correo, registro academico y tu nueva contraseña para restablecerla.</p>
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}
            <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="recoverEmail" autoComplete='off' placeholder="name@example.com" onChange={(e) => setCorreo(e.target.value)} />
                <label htmlFor="recoverEmail">Correo registrado</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="reg" placeholder="Registro Academico"  autoComplete='off' onChange={(e) => setReg(e.target.value)}/>
                <label htmlFor="reg">Registro Academico</label>
            </div>
            <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="password">Nueva Contraseña</label>
                </div>
            <button type="submit" className="btn btn-warning w-100 py-2 rounded-3 fw-semibold">
                Enviar enlace
            </button>
            </form>
            <hr />
            <div className="text-center">
            <Link to="/" className="text-decoration-none">⬅ Volver al login</Link>
            </div>
        </div>
        </div>
    );
}
