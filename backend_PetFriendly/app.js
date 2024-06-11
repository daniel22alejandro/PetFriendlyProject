import express from 'express';
import dotenv from 'dotenv';
import path from 'path'; // Necesario para path.join
import conexion from './src/database/ConexionBD.js';
import userRoutes from './src/routes/UsersRoute.js';
import raceRoutes from './src/routes/RacesRoute.js';
import petRoutes from './src/routes/PetsRoute.js';
import genderRoutes from './src/routes/GendersRoute.js';
import categoryRoutes from './src/routes/CategoriesRoute.js';
import authRoutes from './src/routes/AuthRoute.js';
import cors from 'cors';


dotenv.config(); // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 3000; // Utilizar variable de entorno para el puerto

app.use(express.json());
app.use(cors());


conexion();

app.use('/users', userRoutes);
app.use('/races', raceRoutes);
app.use('/pets', petRoutes);
app.use('/genders', genderRoutes);
app.use('/categories', categoryRoutes);
app.use(authRoutes);

// Documentación
app.set('view engine', 'ejs'); // motor de plantillas
app.set('views','views'); // donde se almacenarán las vistas
app.use(express.static('public'));

app.get('/documents', (req, res) => {
    res.render('documentacion.ejs');
});

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
