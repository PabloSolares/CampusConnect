import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



export default  function  Menu() {
  const [filterCurso, setFilterCurso] = useState("");
const [filterProfesor, setFilterProfesor] = useState("");
const [filterEstudiante, setFilterEstudiante] = useState("");
  const [publicaciones, setPublicaciones] = useState([]);
    
  useEffect(() => {

    const llenarPubli = async () => {
        try {
        const response = await axios.get("http://localhost:4000/publicacion/obtenerPubli");
            if (response.status === 200) {
                
                setPublicaciones(response.data);
            }
        } catch (error) {
            console.error("Error al obtener publicaciones:", error);
        }
    }
    llenarPubli();
  }, []);

const publicacionesFiltradas = publicaciones.filter(pub =>
  (pub.nombre_curso?.toLowerCase() || "").includes(filterCurso.toLowerCase()) &&
  (pub.profesor?.toLowerCase() || "").includes(filterProfesor.toLowerCase()) &&
  (pub.estudiante?.toLowerCase() || "").includes(filterEstudiante.toLowerCase())
);
  
    

  return (
    <div className="d-flex vh-100 bg-light">
      
      
      <div className="bg-dark text-white d-flex flex-column p-3" style={{ width: "220px" }}>
        <h4 className="mb-4">Menú</h4>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-2">
            <Link to="/profile/mi" className="nav-link text-white">Mi Perfil</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/createPubli" className="nav-link text-white">Crear Publicación</Link>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-danger w-100">Cerrar Sesión</button>
          </li>
        </ul>
      </div>

      
      <div className="flex-grow-1 p-4 overflow-auto">
        <h2 className="mb-4">Publicaciones</h2>

       
        <div className="row g-2 mb-4">
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Filtrar por Curso" onChange={(e) => setFilterCurso(e.target.value)} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Filtrar por Catedrático" onChange={(e) => setFilterProfesor(e.target.value)} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Buscar por nombre" onChange={(e) => setFilterEstudiante(e.target.value)} />
          </div>
        </div>

        
        <div className="list-group">
          {publicacionesFiltradas.map((pub) => (
              <div key={pub.id_publicacion} className="list-group-item mb-3 shadow-sm rounded">
                <h5>{pub.nombre_curso}: {pub.profesor}</h5>
                <p className="mb-1">{pub.mensaje}</p>
                <small>{pub.estudiante} | {pub.fecha_creacion}</small>
                <div className="mt-2">
                  <Link to={`/profile/${pub.usuario}`} className="btn btn-sm btn-outline-primary me-2">Ver Perfil</Link>
                  <Link to={`/create`} className="btn btn-sm btn-outline-success">Comentar</Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}