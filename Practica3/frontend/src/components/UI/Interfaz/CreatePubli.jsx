import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CreatePubli() {
    const [tipo, setTipo] = useState("Curso");
    const [id_relacionado, setID] = useState(0);

    const [mensaje, setMensaje] = useState("");


    const [cursos, setCursos] = useState([]);
    const [profes, setProfes] = useState([]);
    const [errorMsg, seterrorMsg] = useState('');
    const [successMsg, setsuccessMsg] = useState('');
    useEffect(() => {
        const llenarCursos = async () => {
            try {
                const response = await axios.get("http://localhost:4000/cursos/get");
                if (response.status === 202) {
                    setCursos(response.data);
                }
            } catch (error) {
                console.error("Error al obtener cursos:", error);
            }
        };
        llenarCursos();
    }, []);

    useEffect(() => {
        const llenarProfes = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:4000/profesores/get"
                );
                if (response.status === 202) {
                    setProfes(response.data);
                }
            } catch (error) {
                console.error("Error al obtener profes:", error);
            }
        };
        llenarProfes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        seterrorMsg("");
        setsuccessMsg("");
        const id_usuario = localStorage.getItem("usuario");

        (async () => {
            try {
                if (tipo === "Curso") {
                    const response = await axios.post('http://localhost:4000/publicacion/crearPublicacion', {
                        id_usuario,
                        mensaje,
                        id_curso: id_relacionado,
                    });

                    if (response.status === 201) {
                        setsuccessMsg(response.data.message || "Publicacion Creada Corretamente");
                    }
                } else {
                    const response = await axios.post('http://localhost:4000/publicacion/crearPublicacion', {
                        id_usuario,
                        mensaje,
                        id_profesor: id_relacionado,
                    });

                    if (response.status === 201) {
                        setsuccessMsg(response.data.message || "Publicacion Creada Corretamente");
                    }
                }
            } catch (error) {
                console.log(error);
                if (error.response) {
                    seterrorMsg(error.response.data.message || "Error en el crear publicacion ");
                } else {
                    seterrorMsg(error.response.data.message || "Error de conexión con el servidor ");
                }
            }
        })()

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
                        <Link to="/profile/mi" className="nav-link text-white">
                            Mi Perfil
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/menu" className="nav-link text-white">
                            Ver Publicaciones
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <button className="btn btn-danger w-100">Cerrar Sesión</button>
                    </li>
                </ul>
            </div>

            <div className="container my-5">
                <div className="card shadow p-4">
                    <h3 className="mb-4">Crear Publicación</h3>
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Selecciona tipo</label>
                            <select
                                className="form-select"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            >
                                <option value="Curso">Curso</option>
                                <option value="Catedrático">Catedrático</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{tipo} relacionado</label>
                            {tipo === "Curso" ? (
                                cursos && cursos.length > 0 ? (
                                    <select
                                        className="form-select"
                                        value={id_relacionado}
                                        onChange={(e) => setID(e.target.value)} 
                                    >
                                        <option value="">Selecciona un curso</option>
                                        {cursos.map((c) => (
                                            <option key={c.id_curso} value={c.id_curso}>
                                                {c.nombre_curso}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-danger">ERROR EN LA BASE DE DATOS</p>
                                )
                            ) : profes && profes.length > 0 ? (
                                <select
                                    className="form-select"
                                    value={id_relacionado}
                                    onChange={(e) => setID(e.target.value)} 
                                >
                                    <option value="">Selecciona un profesor</option>
                                    {profes.map((p) => (
                                        <option key={p.id_profesor} value={p.id_profesor}>
                                            {p.nombres} {p.apellidos}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p className="text-danger">ERROR EN LA BASE DE DATOS</p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mensaje</label>
                            <textarea className="form-control" rows="3" onChange={(e) => setMensaje(e.target.value)} ></textarea>
                        </div>
                        <button type="submit" className="btn btn-success w-100">
                            Publicar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
