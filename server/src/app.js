import express from 'express'
import cors from 'cors'

export const app = express();

/* Middlewares base */
app.use(express.json());
app.use(cors());

/* Ruta principal */
app.get('/', (req, res) => {
    res.send('Server is online');
});

/* Api Test conexion cliente - servidor */
app.get('/test', (req, res) => {
    try {
        const message = 'Hola!, estas conectado al servidor!.';
        console.log('Alguien se acaba de conectar al servidor a traves de el sitio web');

        res.status(200)
            .json({
                status: 200,
                message,
                success: true
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


