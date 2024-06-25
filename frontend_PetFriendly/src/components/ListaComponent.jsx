import React, { useState, useEffect } from "react";
import axios from "../services/axiosConfig"; // Importa la instancia configurada
import { Link, useNavigate } from "react-router-dom";

const ListarComponent = () => {
    const [mascotas, setMascotas] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [conteoMascotas, setConteoMascotas] = useState({ totalMascotas: 0, machos: 0, hembras: 0 });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/');
            return;
        }

        const config = {
            headers: {
                'token': token //
            }
        };

        axios.get("/pets/listar", config)
            .then(response => {
                console.log("Datos recibidos:", response.data);
                setMascotas(response.data); 
                contarMachosYHembras(response.data);
            })
            .catch(error => {
                console.error("Error al obtener la lista de mascotas:", error);
                setError("Error al obtener la lista de mascotas. Por favor, intenta de nuevo más tarde.");
            });
    }, [navigate]);

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta mascota?")) {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        'token': token // Asegúrate de que este encabezado coincida con el esperado por tu backend
                    }
                };

                await axios.delete(`/pets/eliminar/${id}`, config);
                const updatedMascotas = mascotas.filter(mascota => mascota._id !== id);
                setMascotas(updatedMascotas);
                contarMachosYHembras(updatedMascotas);
            } catch (error) {
                console.error("Error al eliminar la mascota:", error);
                setError("Error al eliminar la mascota. Por favor, intenta de nuevo más tarde.");
            }
        }
    };

    // Función para contar mascotas por género
    const contarMachosYHembras = (mascotas) => {
        const totalMascotas = mascotas.length;
        const machos = mascotas.filter(mascota => mascota.gender_id?.name_genders === 'Macho').length;
        const hembras = mascotas.filter(mascota => mascota.gender_id?.name_genders === 'Hembra').length;
        setConteoMascotas({ totalMascotas, machos, hembras });
    };
    
    const handleConsultar = () => {
        return `Total Mascotas: ${conteoMascotas.totalMascotas}, Machos: ${conteoMascotas.machos}, Hembras: ${conteoMascotas.hembras}`;
    };

    return (
        <div className="flex relative bg-[url('../imgs/bg.svg')] w-[400px] h-[785px] justify-center items-center flex-col">
            <div className="flex absolute flex-row text-white top-10 gap-10">
                <p>Administrar Mascotas</p>
                <Link to='/' className="bg-[url('../imgs/btn-close.svg')] w-[34px] h-[34px] flex absolute left-56 cursor-pointer"></Link>
            </div>
            <Link to='/añadir' className="bg-[url('../imgs/btn-add.svg')] w-[360px] h-[50px] flex absolute cursor-pointer top-32"></Link>
            {error && <p>{error}</p>}
            
            <div className="top-40 gap-10 flex bg-gray-400 w-[360px] h-24 rounded-2xl items-center">
                <p className="text-sky-700">{handleConsultar()}</p>
            </div>
            
            {mascotas && mascotas.map((mascota, index) => (
                <div key={mascota._id} className={`flex bg-gray-400 w-11/12 h-24 rounded-2xl ${index === 0 ? 'top-80' : index === 1 ? 'top-110' : index === 2 ? 'top-140' : index === 3 ? 'top-170' : `top-${170 + (index - 3) * 30}`} items-center hover:bg-gray-500`}>
                    <img src={`http://localhost:3000/img/${mascota.photo}`} alt={mascota.name} className="w-20 h-20 object-cover" />
                    <div className="flex absolute flex-col left-24">
                        <p className="text-sky-700 font-semibold">{mascota.name || 'Nombre no disponible'}</p>
                        <p className="text-sky-700">{mascota.race_id?.name_races || 'Raza no disponible'}</p>
                        <p className="text-sky-700">{mascota.category_id?.name_categories || 'Categoría no disponible'}</p>
                    </div>
                    <Link to={`/consulta/${mascota._id}`} className="flex absolute bg-[url('../imgs/btn-show.svg')] w-[34px] h-[34px] right-28 cursor-pointer"></Link>
                    <Link to={`/editar/${mascota._id}`} className="flex absolute bg-[url('../imgs/btn-edit.svg')] w-[34px] h-[34px] right-16 cursor-pointer"></Link>
                    <div className="flex absolute bg-[url('../imgs/btn-delete.svg')] w-[34px] h-[34px] right-4 cursor-pointer" onClick={() => handleDelete(mascota._id)}></div>
                </div>
            ))}
        </div>
    );
};

export default ListarComponent;
