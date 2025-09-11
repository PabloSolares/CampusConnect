import {Router} from "express";
import { actualizarUsuario, crearComentario, crearPubli, crearUsuario, getComentarios, getPublis, getPublisPorCurso, getPublisPorID, getPublisPorProfe, login, obtenerCursos, obtenerProfes, obtenerUsuario, recuperarPass } from "../controllers/routes.controller.js";

const routes = Router();

routes.post("/usuarios/register", crearUsuario);
routes.post("/usuarios/login", login);
routes.get("/usuarios/perfil/:id", obtenerUsuario);
routes.post("/usuarios/actualizar/:id", actualizarUsuario);
routes.post("/usuarios/recuperarPass", recuperarPass);
routes.post("/publicacion/crearPublicacion", crearPubli);
routes.get("/publicacion/obtenerPubli", getPublis);
routes.get("/publicacion/obtenerPubliID/:id_publicacion", getPublisPorID);

routes.get("/publicacion/obtenerPubliCurso/:id_curso", getPublisPorCurso);
routes.get("/publicacion/obtenerPubliProfe/:id_profesor", getPublisPorProfe);
routes.post("/comentario/crear", crearComentario);
routes.get("/comentario/get/:id_publicacion", getComentarios);
routes.get("/profesores/get", obtenerProfes);
routes.get("/cursos/get", obtenerCursos);

export default routes;