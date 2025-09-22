import express from 'express'
import cors from 'cors'
import { pool } from './config/databaseConfig.js';
import auth from './auth/authRoutes.js';
import users from './auth/userRoutes.js';
import cookieParser from "cookie-parser";

export const app = express();

/* Middlewares base */
app.use(express.json());
app.use(cookieParser()); // 👈 antes de las rutas
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true                
}));

app.use('/auth', auth);
app.use('/users', users);

/* Ruta principal */
app.get('/', (req, res) => {
    res.send('Server is online');
});

/* Api Test conexion servidor - base de datos */
app.get('/database-test', async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM NOW()');
        const data = response.rows;

        res.status(200)
            .json({
                status: 200,
                success: true,
                data
            });
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({
                status: 500,
                message: 'Problema en el servidor',
                success: false
            });
    }
});


