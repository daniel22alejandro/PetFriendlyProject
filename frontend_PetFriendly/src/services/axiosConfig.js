import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000', // URL DEL BACKEND DEL PROYECTO
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Obtén el token del localStorage
        if (token) {
            config.headers['token'] = token; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Redirigir al usuario al inicio de sesión si el token no es válido o ha expirado
            window.location.href = '/'; 
        }
        return Promise.reject(error);
    }
);

export default instance;
