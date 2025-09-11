import { pool } from "../app.js";

import { hash, compare } from "bcrypt";
import bcrypt from "bcrypt";

const validarCorreo = (correo) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
};

// ESTUDIANTES
export const crearUsuario = async (req, res) => {
    try {
        const {registro_academico, nombres, apellidos, correo, password} = req.body;
        const encript = await bcrypt.hash(password, 10);
        if(validarCorreo(correo)){

            await pool.query(
                "INSERT INTO Estudiantes (registro_academico, nombres, apellidos, email, password) VALUES (?, ?, ?, ?, ?)",
                [registro_academico, nombres, apellidos, correo, encript]
            );
        } else{
            return res.status(400).json(({error: "Correo no es valido. Ejemplo: usuario@ejemplo.com"}));
        }

        return res.status(202).json({message: "Usuario creado con exito"});

    } catch (err) {
        return res.status(500).json({status: 500, message: "No se pudo crear el usuario en la base de datos", error: error})
    }
}

export const login = async(req, res) => {
    try {
        const {registro_academico, password} = req.body;
        const [rows] = await pool.query("SELECT * FROM estudiantes WHERE registro_academico = ?", [registro_academico]);

        if(rows.length === 0) {
            return res.status(401).json(({error: "Usuario no encontrado"}));
        }

        const usuario = rows[0];
        const encontrado = await compare(password, usuario.password);

        if(!encontrado){
           return res.status(401).json(({error: "Contraseña Incorrecta"}));
        }

        return res.json({message : "Login correcto", token: usuario});


    } catch (err) {
        res.status(500).json(({error: err.message}));
    }
}

export const obtenerUsuario = async(req, res) => {
    try {
        const [rows] = await pool.query("SELECT id_usuario registro_academico, nombres, apellidos, email FROM estudiantes WHERE id_usuario = ?", [req.params.id]);

        if(rows.length === 0) {
            res.status(400).json(({error: "Usuario no encontrado"}));
        }

        res.status(202).json(rows[0]);

    } catch (err) {
        res.status(500).json(({error: err.message}));
    }
}

export const actualizarUsuario = async(req, res) => {
    try {
        const { nombres, apellidos, email } = req.body;
        if(validarCorreo(correo)){
            await pool.query("UPDATE estudiantes SET nombres = ?, apellidos = ?, correo = ?  email WHERE id_usuario = ?", [nombres, apellidos,email, req.params.id]);
        } else {
            res.status(400).json(({error: "Correo no es valido. Ejemplo: usuario@ejemplo.com"}));
        }

        res.status(202).json(({error: "Usuario actualizado"}));

    } catch (err) {
        res.status(500).json(({error: err.message}));
    }
}

export const recuperarPass = async(req, res) => {
    try {
        const { registro_academico, email, password } = req.body;
        if (!registro_academico || !email || !password) {
        return res.status(400).json({ message: "Faltan datos (registro_academico, email o password)" });
        }
        const [rows] = await pool.query("SELECT * FROM estudiantes WHERE registro_academico = ? AND email = ?", [registro_academico, email]);

        if(rows.length === 0) {
            return res.status(400).json(({message: "Usuario no encontrado"}));
        }
        const encriptada = await hash(password, 10);

        await pool.query('UPDATE estudiantes SET password = ? WHERE id_usuario = ?', [encriptada, rows[0].id_usuario]);
        return res.status(202).json(({message: "Contraseña actualizada"}));

    } catch (err) {
        
       return res.status(500).json({status: 500, message: "No se pudo crear el usuario en la base de datos", error: err})
    }
}

// PUBLICACIONES

export const crearPubli = async (req, res) => {
    try {
        const { id_usuario, id_curso, id_profesor, mensaje } = req.body;
     

        if (!id_usuario || !mensaje) {
            return res.status(400).json({ error: "Faltan datos para que se cree la publicacion" });
        }
        try {
            await pool.query(
                "INSERT INTO publicacion_cursos (id_usuario, id_curso, id_profesor, mensaje) VALUES (?, ?, ?, ?)",
                [id_usuario, id_curso || null, id_profesor || null, mensaje]
            );
            res.status(201).json({ message: "Publicación creada" });
            
        } catch (error) {
            res.status(500).json({ message: `Error en la base de datos ${error}` });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

export const getPublis =  async (req, res) => {
    try {
        const [rows] = await pool.query(`            
            SELECT p.id_publicacion, p.mensaje, p.fecha_creacion,
            u.nombres as estudiante, c.nombre_curso, pr.nombres AS profesor
            from publicacion_cursos p
            JOIN estudiantes u ON p.id_usuario= u.id_usuario
            LEFT JOIN Cursos c on p.id_curso = c.id_curso
            LEFT JOIN Profesores pr on p.id_profesor= pr.id_profesor
            ORDER BY p.fecha_creacion DESC ;    `, [req.params.id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getPublisPorCurso =  async (req, res) => {
    try {
        const [rows] = await pool.query(`            
            SELECT p.id_publicacion, p.mensaje, p.fecha_creacion,
            u.nombres AS estudiante, c.nombre_curso, pr.nombres AS profesor
            from publicacion_cursos p
                JOIN estudiantes u ON p.id_usuario= u.id_usuario
                LEFT JOIN Cursos c on p.id_curso = c.id_curso
                LEFT JOIN Profesores pr on p.id_profesor= pr.id_profesor
                    where p.id_curso = ?
        ORDER BY p.fecha_creacion DESC `, [req.params.id_curso]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

export const getPublisPorProfe = async (req, res) => {
    try {
        const [rows] = await pool.query(`            
            SELECT p.id_publicacion, p.mensaje, p.fecha_creacion,
            u.nombres as estudiante, c.nombre_curso, pr.nombres AS profesor
            from publicacion_cursos p
            JOIN estudiantes u ON p.id_usuario= u.id_usuario
            LEFT JOIN Cursos c on p.id_curso = c.id_curso
            LEFT JOIN Profesores pr on p.id_profesor= pr.id_profesor
                where p.id_profesor = ?
            ORDER BY p.fecha_creacion DESC `, [req.params.id_profesor]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
// COMENTARIOS
export const crearComentario = async (req, res) => {
    try {
        const { id_publicacion, id_usuario, mensaje } = req.body;

        if (!id_publicacion || !id_usuario || !mensaje) {
            return res.status(400).json({ error: "Asegurate de llenar todos los datos" });
        }

        await pool.query(
            "INSERT INTO Comentarios (id_publicacion, id_usuario, mensaje) VALUES (?, ?, ?)",
            [id_publicacion, id_usuario, mensaje]
        );
        res.status(201).json({ message: "Comentario creado " });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getComentarios(req, res) {
    try {
    
        const id_publicacion = req.params.id_publicacion;

        let [response] = await pool.query('SELECT pc.id_publicacion, e.nombres, e.apellidos, pc.mensaje FROM comentarios pc JOIN estudiantes e ON e.id_usuario = pc.id_usuario WHERE pc.id_publicacion = ?', [id_publicacion])
        return res.status(200).json({status: 200, comentarios: response})
    } catch (error) {
        return res.status(500).json({"message": `Error al obtener los comentarios de la publicación ${error}`});
    }
}
