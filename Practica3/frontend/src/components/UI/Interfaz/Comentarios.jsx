import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Comentarios() {
    const { id } = useParams();
    const [publicacion, setPublicacion] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const publiRes = await axios.get(
                    `http://localhost:4000/publicacion/obtenerPubliID/${id}`
                );
                if (publiRes.status === 200) {
                    setPublicacion(publiRes.data);
                }

                const comRes = await axios.get(
                    `http://localhost:4000/comentario/get/${id}`
                );
                if (comRes.status === 200) {
                    setComentarios(comRes.data);
                }
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };

        fetchData();
    }, [id]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const id_usuario = localStorage.getItem("usuario"); 
            const response = await axios.post(
                `http://localhost:4000/comentario/crear`,
                {
                    id_usuario,
                    id_publicacion: id,
                    mensaje: nuevoComentario,
                }
            );

            if (response.status === 201) {
                setSuccessMsg("Comentario agregado correctamente");
                
            }
        } catch (error) {
            console.error(error);
            setErrorMsg("No se pudo enviar el comentario ");
        }
    };

    return (
        <div className="container my-5">
            <Link to="/menu" className="btn btn-secondary mb-3">
                ← Volver
            </Link>

            {publicacion ? (
                <div className="card shadow-sm p-4 mb-4">
                    <h4>
                        {publicacion.nombre_curso} - {publicacion.profesor}
                    </h4>
                    <p>{publicacion.mensaje}</p>
                    <small className="text-muted">
                        {publicacion.estudiante} | {publicacion.fecha_creacion}
                    </small>
                </div>
            ) : (
                <p>Cargando publicación...</p>
            )}

            <div className="card shadow-sm p-4">
                <h5>Comentarios</h5>
                <ul className="list-group mb-3">
                    {comentarios   ? (
                        comentarios.map((c) => (
                            <li
                                key={c.id_comentario}
                                className="list-group-item d-flex justify-content-between"
                            >
                                <span>Comentario: {c.mensaje}</span>
                                <small className="text-muted">
                                    Usuario: {c.nombres} {c.apellidos}  Fecha: {c.fecha_creacion}
                                </small>
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item">No hay comentarios aún</li>
                    )}
                </ul>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="2"
                            placeholder="Escribe un comentario..."
                            value={nuevoComentario}
                            onChange={(e) => setNuevoComentario(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Comentar
                    </button>
                </form>

                {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}
                {successMsg && <p className="text-success mt-2">{successMsg}</p>}
            </div>
        </div>
    );
}
