import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";


import routes from "./routes/routes.js";

dotenv.config();

const app = express();
app.use(cors());

app.set('view engine', 'ejs'); 
app.set('views', './views');
app.use(express.text())
app.use(express.json());

export const pool = mysql.createPool({
    host:  "localhost",
    user:  "root",
    password:  "admin",
    database: "mydb",
    waitForConnections: true,
    connectionLimit: 10
});

app.use(routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});