# CampusConnect — Plataforma de comunidad académica

Aplicación web full-stack orientada a la comunicación entre estudiantes mediante publicaciones, comentarios y perfiles de usuario.

El módulo principal se encuentra en `Practica3`.

## Funcionalidades

- Registro e inicio de sesión.
- Recuperación de cuenta.
- Gestión de perfiles.
- Creación y visualización de publicaciones.
- Comentarios.
- Comunicación entre frontend y backend mediante una API REST.
- Persistencia de información en MySQL.
- Cifrado de contraseñas con bcrypt.

## Tecnologías

### Frontend

- React
- React Router
- Axios
- JavaScript
- HTML y CSS

### Backend

- Node.js
- Express.js
- REST API
- MySQL
- MySQL2
- Bcrypt
- CORS
- Dotenv

## Arquitectura

```text
Practica3/
├── frontend/   # Aplicación React
└── backend/    # API REST con Node.js y Express
```
##Instalación
Configura primero las variables de entorno del backend. No incluyas contraseñas ni claves directamente en el repositorio.
cd Practica3/backend
npm install
npm run dev

## En otra terminal:
cd Practica3/frontend
npm install
npm start

## Objetivo
Este proyecto permitió aplicar conceptos de desarrollo full-stack, diseño de APIs, autenticación, bases de datos relacionales y desarrollo de interfaces web.
Las demás carpetas contienen prácticas iniciales. La aplicación principal es Practica3.
