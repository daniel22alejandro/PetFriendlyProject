import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InicioLoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            console.log('Token recibido del backend:', data.token);
            if (email === 'daniel@gmail.com') {
                alert(`Bienvenido: ${email}`);
            }
            navigate('/lista');
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="flex relative bg-[url('../../imgs/bg-login.svg')] w-[400px] h-[785px] justify-center items-center">
            <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
                <input
                    className="absolute flex w-11/12 pl-4 rounded-full outline-none h-11 opacity-60 bg-slate-100 bottom-44 placeholder:text-sky-800"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Correo Electrónico"
                />

                <input
                    className="absolute flex w-11/12 pl-4 rounded-full outline-none h-11 opacity-60 bg-slate-100 bottom-28 placeholder:text-sky-800"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Contraseña"
                />

                <button
                    type="submit"
                    className="absolute flex items-center justify-center w-11/12 pl-4 text-gray-300 bg-blue-900 rounded-full h-11 bottom-9"
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
};

export default InicioLoginComponent;
