import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Perfil() {
    const [usuario, setUsuario] = useState(null);
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const id_usuario = localStorage.getItem("usuario");


    useEffect(() => {
        const obtenerUsuario = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:4000/usuarios/perfil/${id_usuario}`
                );
                if (res.status === 202) {
                    setUsuario(res.data);
                    setNombres(res.data.nombres);
                    setApellidos(res.data.apellidos);
                    setEmail(res.data.email);
                }
            } catch (error) {
                console.error("Error al obtener el usuario:", error);
                setErrorMsg("No se pudieron cargar los datos");
            }
        };
        obtenerUsuario();
    }, [id_usuario]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg("");
        setErrorMsg("");

        try {
            const res = await axios.post(
                `http://localhost:4000/usuarios/actualizar/${id_usuario}`,
                { nombres, apellidos, email }
            );
            if (res.status === 202) {
                setSuccessMsg("Datos actualizados correctamente ");
            }
        } catch (error) {
            console.error(error);
            setErrorMsg("No se pudo actualizar la información ");
        }
    };

    if (!usuario) {
        return <div className="container mt-5">Cargando perfil...</div>;
    }

    return (
        <div className="d-flex vh-100 bg-light">

            <div
                className="bg-dark text-white d-flex flex-column p-3"
                style={{ width: "220px" }}
            >
                <h4 className="mb-4">Menú</h4>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item mb-2">
                        <Link to="/menu" className="nav-link text-white">
                            Ver Publicaciones
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/createPubli" className="nav-link text-white">
                            Crear Publicación
                        </Link>
                    </li>
                </ul>
            </div>


            <div className="container my-5">
                <div className="card shadow p-4">
                    <h3 className="mb-4"> Mi Perfil</h3>

                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                    {successMsg && <div className="alert alert-success">{successMsg}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nombres</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nombres}
                                onChange={(e) => setNombres(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Apellidos</label>
                            <input
                                type="text"
                                className="form-control"
                                value={apellidos}
                                onChange={(e) => setApellidos(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Correo electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Actualizar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}