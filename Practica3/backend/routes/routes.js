import {Router} from "express";
import { actualizarUsuario, crearComentario, crearPubli, crearUsuario, getComentarios, getPublis, getPublisPorCurso, getPublisPorProfe, login, obtenerUsuario, recuperarPass } from "../controllers/routes.controller.js";

const routes = Router();

routes.post("/usuarios/register", crearUsuario);
routes.post("/usuarios/login", login);
routes.get("/usuarios/perfil:id", obtenerUsuario);
routes.post("/usuarios/actualizar", actualizarUsuario);
routes.post("/usuarios/recuperarPass", recuperarPass);
routes.post("/publicacion/crearPublicacion", crearPubli);
routes.get("/publicacion/obtenerPubli", getPublis);
routes.get("/publicacion/obtenerPubliCurso/:id_curso", getPublisPorCurso);
routes.get("/publicacion/obtenerPubliProfe/:id_profesor", getPublisPorProfe);
routes.post("/comentario/crear", crearComentario);
routes.get("/comentario/get/:id_publicacion", getComentarios);
export default routes;