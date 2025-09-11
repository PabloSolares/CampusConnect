import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Register() {
    const[reg, setReg] = useState('');
    const[password, setPassword] = useState('');
    const[nombres, setNombres] = useState('');
    const[apellidos, setApellidos] = useState('');
    const[correo, setCorreo] = useState('');

    const[errorMsg, seterrorMsg] = useState('');
    const[successMsg, setsuccessMsg] = useState('');

    const handleSubmit  =  (e) => {
       e.preventDefault();
        seterrorMsg("");  
        setsuccessMsg(""); 

       (async () => {
            try {
                const response = await axios.post('http://localhost:4000/usuarios/register', {
                    registro_academico: reg,
                    password,
                    nombres, 
                    apellidos, 
                    correo, 
                });
                
                if(response.status === 202){
                    setsuccessMsg(response.data.message || "Usuario creado exitosamente");
                }
            } catch (error) {
                console.log(error);
                if(error.response){
                    seterrorMsg(error.response.data.message || "Error en el registro ");
                } else {
                    seterrorMsg(error.response.data.message ||"Error de conexión con el servidor ");
                }
            }
       })()
    }
 return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-gradient bg-success bg-opacity-75">
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ width: "28rem" }}>
        <h2 className="text-center fw-bold mb-4 text-success">Crear Cuenta </h2>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}
        <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
            <input type="text"  autoComplete="off" className="form-control" id="reg" placeholder="Registro Academico" onChange={(e) => setReg(e.target.value)} />
            <label htmlFor="reg">Registro Academico</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" autoComplete="off" className="form-control" id="name" placeholder="Nombres" onChange={(e) => setNombres(e.target.value)} />
            <label htmlFor="name">Nombres</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" autoComplete="off" className="form-control" id="apellidos" placeholder="Apellidos" onChange={(e) => setApellidos(e.target.value)} />
            <label htmlFor="apellidos">Apellidos</label>
          </div>
          <div className="form-floating mb-3">
            <input type="email" autoComplete="off" className="form-control" id="email" placeholder="name@example.com"  onChange={(e) => setCorreo(e.target.value)} />
            <label htmlFor="email">Correo electrónico</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="password">Contraseña</label>
          </div>
          <button type="submit" className="btn btn-success w-100 py-2 rounded-3 fw-semibold">
            Registrarse
          </button>
        </form>
        <hr />
        <div className="text-center">
          <Link to="/" className="text-decoration-none">Volver al login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register