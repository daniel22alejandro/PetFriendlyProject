import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";

const ConsultaComponent = () => {
    const [mascota, setMascota] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams(); // Obtener el ID de la mascota desde la URL
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/');
            return;
        }

        const config = {
            headers: {
                'token': token
            }
        };

        axios.get(`/pets/listarId/${id}`, config) 
            .then(response => {
                setMascota(response.data); 
            })
            .catch(error => {
                console.error("Error al obtener los detalles de la mascota:", error);
                setError("Error al obtener los detalles de la mascota. Por favor, intenta de nuevo más tarde.");
            });
    }, [id, navigate]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!mascota) {
        return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
    }

    return (
        <>
            <div className="flex relative bg-[url('../../imgs/bg.svg')] w-[400px] h-[785px] justify-center items-center flex-col">
                <div className="flex absolute flex-row text-white top-10">
                    <Link to='/lista' className="bg-[url('../../imgs/btn-back.svg')] w-[12px] h-[20px] flex absolute right-56 cursor-pointer"></Link>
                    <p>Consultar Mascota</p>
                    <Link to='/' className="bg-[url('../../imgs/btn-close.svg')] w-[34px] h-[34px] flex absolute left-52 cursor-pointer"></Link>
                </div>
                <img src={`http://localhost:3000/img/${mascota.photo}`} alt={mascota.name} className="w-[152px] h-[153px] flex absolute top-32" />
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-row absolute w-[350px] top-[350px]">
                        <div className="flex bg-slate-400 w-5/12 h-[55px] text-white rounded-l-xl items-center pl-4 text-lg">Nombre:</div>
                        <div className="flex bg-slate-300 w-7/12 h-[55px] text-sky-800 rounded-r-xl items-center pl-4 text-lg">{mascota.name}</div>
                    </div>
                    <div className="flex flex-row absolute w-[350px] h-12 bottom-[320px]">
                        <div className="flex bg-slate-400 w-5/12 h-[55px] text-white rounded-l-xl items-center pl-4 text-lg">Raza:</div>
                        <div className="flex bg-slate-300 w-7/12 h-[55px] text-sky-800 rounded-r-xl items-center pl-4 text-lg">{mascota.race_id?.name_races || 'Raza no disponible'}</div>
                    </div>
                    <div className="flex flex-row absolute w-[350px] h-12 bottom-[254px]">
                        <div className="flex bg-slate-400 w-5/12 h-[55px] text-white rounded-l-xl items-center pl-4 text-lg">Categoría:</div>
                        <div className="flex bg-slate-300 w-7/12 h-[55px] text-sky-800 rounded-r-xl items-center pl-4 text-lg">{mascota.category_id?.name_categories || 'Categoría no disponible'}</div>
                    </div>
                    <div className="flex flex-row absolute w-[350px] h-12 bottom-[188px]">
                        <div className="flex bg-slate-400 w-5/12 h-[55px] text-white rounded-l-xl items-center pl-4 text-lg">Género:</div>
                        <div className="flex bg-slate-300 w-7/12 h-[55px] text-sky-800 rounded-r-xl items-center pl-4 text-lg">{mascota.gender_id?.name_genders || 'Género no disponible'}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConsultaComponent;
