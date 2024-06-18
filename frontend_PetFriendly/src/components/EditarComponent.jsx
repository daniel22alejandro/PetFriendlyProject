import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";

const EditarComponent = () => {
    const [mascota, setMascota] = useState({
        name: '',
        race_id: '',
        category_id: '',
        photo: '',
        gender_id: ''
    });
    const [categories, setCategories] = useState([]);
    const [races, setRaces] = useState([]);
    const [genders, setGenders] = useState([]);
    const [newPhoto, setNewPhoto] = useState(null); // Nuevo estado para la nueva foto
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
                const mascota = response.data;
                setMascota({
                    name: mascota.name,
                    race_id: mascota.race_id._id,
                    category_id: mascota.category_id._id,
                    photo: mascota.photo,
                    gender_id: mascota.gender_id._id
                });
            })
            .catch(error => {
                console.error("Error al obtener los detalles de la mascota:", error);
                setError("Error al obtener los detalles de la mascota. Por favor, intenta de nuevo más tarde.");
            });

        // Fetch categories, races, and genders
        axios.get('/categories/listar', config)
            .then(response => setCategories(response.data))
            .catch(error => console.error("Error al obtener las categorías:", error));

        axios.get('/races/listar', config)
            .then(response => setRaces(response.data))
            .catch(error => console.error("Error al obtener las razas:", error));

        axios.get('/genders/listar', config)
            .then(response => setGenders(response.data))
            .catch(error => console.error("Error al obtener los géneros:", error));
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMascota(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        setNewPhoto(e.target.files[0]);
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'token': token,
                'Content-Type': 'multipart/form-data'
            }
        };

        const formData = new FormData();
        formData.append('name', mascota.name);
        formData.append('race_id', mascota.race_id);
        formData.append('category_id', mascota.category_id);
        formData.append('gender_id', mascota.gender_id);
        if (newPhoto) {
            formData.append('photo', newPhoto);
        }

        axios.put(`/pets/actualizar/${id}`, formData, config)
            .then(response => {
                console.log("Mascota actualizada:", response.data);
                navigate('/lista');
            })
            .catch(error => {
                console.error("Error al actualizar la mascota:", error);
                setError("Error al actualizar la mascota. Por favor, intenta de nuevo más tarde.");
            });
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="flex relative bg-[url('../../imgs/bg.svg')] w-[400px] h-[785px] justify-center items-center flex-col">
                <div className="flex absolute flex-row text-white top-10">
                    <Link to='/lista' className="bg-[url('../../imgs/btn-back.svg')] w-[12px] h-[20px] flex absolute right-56 cursor-pointer"></Link>
                    <p>Modificar Mascota</p>
                    <Link to='/' className="bg-[url('../../imgs/btn-close.svg')] w-[34px] h-[34px] flex absolute left-52 cursor-pointer"></Link>
                </div>
                <img src={`http://localhost:3000/img/${mascota.photo}`} alt={mascota.name} className="w-[152px] h-[153px] flex absolute top-32" />
                <form className="flex items-center justify-center flex-col" onSubmit={handleUpdate}>
                    <div className="flex items-center justify-center">
                        <input
                            type="text"
                            name="name"
                            value={mascota.name}
                            onChange={handleInputChange}
                            className="absolute flex w-11/12 pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 top-[330px] placeholder:text-sky-800"
                            placeholder="Nombre"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <select
                            name="race_id"
                            value={mascota.race_id}
                            onChange={handleInputChange}
                            className="absolute flex w-11/12 pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 bottom-[330px] placeholder:text-sky-800"
                        >
                            <option value="">Seleccione una raza</option>
                            {races.map(race => (
                                <option key={race._id} value={race._id}>{race.name_races}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-center">
                        <select
                            name="category_id"
                            value={mascota.category_id}
                            onChange={handleInputChange}
                            className="absolute flex w-11/12 pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 bottom-[255px] placeholder:text-sky-800"
                        >
                            <option value="">Seleccione una categoría</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name_categories}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-center">
                        <input
                            type="file"
                            name="photo"
                            onChange={handlePhotoChange}
                            className="absolute flex w-11/12 pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 bottom-[180px] placeholder:text-sky-800"
                            placeholder="Cambiar Foto"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <select
                            name="gender_id"
                            value={mascota.gender_id}
                            onChange={handleInputChange}
                            className="absolute flex w-11/12 pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 bottom-[105px] placeholder:text-sky-800"
                        >
                            <option value="">Seleccione un género</option>
                            {genders.map(gender => (
                                <option key={gender._id} value={gender._id}>{gender.name_genders}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="bg-[url('../../imgs/btn-update.svg')] w-[360px] h-[50px] flex absolute bottom-8 cursor-pointer"></button>
                </form>
            </div>
        </>
    )
}

export default EditarComponent;
