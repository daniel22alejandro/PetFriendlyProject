// src/database/ConexionBD.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DATABASE_URL;

const conexion = async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conexión correcta');
    } catch (err) {
        console.error('Error de conexión a la base de datos', err);
    }
};

export default conexion;















//este es lo mio

// import mongoose from 'mongoose';

// const conexion = async () => {
// try {
//     await mongoose.connect('mongodb://localhost:27017/petfinder');
//     console.log('Conexion correcta');
// } catch (err) {
//     console.error('Error de conexion a la base de datos', err);
// }
// };

// export default conexion;
