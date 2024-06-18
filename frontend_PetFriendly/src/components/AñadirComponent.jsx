// src/components/AñadirComponent.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig"; // Importa la instancia configurada

const AñadirComponent = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [race_id, setRaceId] = useState("");
    const [category_id, setCategoryId] = useState("");
    const [photo, setPhoto] = useState(null);
    const [gender_id, setGenderId] = useState("");
    const [message, setMessage] = useState("");
    const [race_ids, setRaceIds] = useState([]);
    const [category_ids, setCategoryIds] = useState([]);
    const [gender_ids, setGenderIds] = useState([]);

    useEffect(() => {
        const fetchRazas = async () => {
            try {
                const response = await axios.get("/races/listar");
                console.log("races:", response.data);
                setRaceIds(response.data);
            } catch (error) {
                console.error("Error fetching razas:", error);
            }
        };

        const fetchCategorias = async () => {
            try {
                const response = await axios.get("/categories/listar");
                console.log("categories:", response.data);
                setCategoryIds(response.data);
            } catch (error) {
                console.error("Error fetching categorias:", error);
            }
        };

        const fetchGeneros = async () => {
            try {
                const response = await axios.get("/genders/listar");
                console.log("genders:", response.data);
                setGenderIds(response.data);
            } catch (error) {
                console.error("Error fetching generos:", error);
            }
        };

        fetchRazas();
        fetchCategorias();
        fetchGeneros();
    }, []);

    const handleRegistro = async () => {
        if (!name || !race_id || !category_id || !photo || !gender_id) {
            setMessage("Todos los campos deben estar llenos.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("race_id", race_id);
            formData.append("category_id", category_id);
            formData.append("photo", photo);
            formData.append("gender_id", gender_id);

            const response = await axios.post("/pets/registrar", formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response ? error.response.data.message : "Error en el registro");
        }
    };

    const handleImageChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    return (
        <>
            <div className="flex relative bg-[url('../imgs/bg.svg')] w-[400px] h-[785px] justify-center items-center flex-col">
                <div className="flex absolute flex-row text-white top-10">
                    <Link to='/lista' className="bg-[url('../imgs/btn-back.svg')] w-[12px] h-[20px] flex absolute right-56 cursor-pointer"></Link>
                    <p>Adicionar Mascota</p>
                    <Link to='/' className="bg-[url('../imgs/btn-close.svg')] w-[34px] h-[34px] flex absolute left-52 cursor-pointer"></Link>
                </div>
                <div className="bg-[url('../imgs/photo-lg-0.svg')] w-[150px] h-[150px] flex absolute top-32"></div>
                {/* nombre */}
                <div className="flex items-center justify-center mt-48">
                    <div className="flex items-center justify-center">
                        <input type="text" className="w-[360px] pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 placeholder:text-sky-800 hover:bg-slate-200" placeholder="Nombre" onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                {/* seleccione raza */}
                <div className="flex items-center justify-center mt-8">
                    <div className="cursor-pointer">
                        <select className="w-[360px] pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 placeholder:text-sky-800 hover:bg-slate-200" onChange={(e) => setRaceId(e.target.value)} defaultValue="">
                            <option value="" disabled hidden>Seleccione Raza...</option>
                            {race_ids.map((race) => (
                                <option key={race._id} value={race._id}>{race.name_races}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* seleccione categoria */}
                <div className="flex items-center justify-center mt-8">
                    <div className="cursor-pointer">
                        <select className="w-[360px] pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 placeholder:text-sky-800 hover:bg-slate-200" onChange={(e) => setCategoryId(e.target.value)} defaultValue="">
                            <option value="" disabled hidden>Seleccione Categoría...</option>
                            {category_ids.map((category) => (
                                <option key={category._id} value={category._id}>{category.name_categories}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* seleccione foto */}
                <div className="flex items-center justify-center mt-8">
                    <div className="w-[24px] h-[24px] flex cursor-pointer"></div>
                    <input type="file" className="w-[360px] pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 placeholder:text-sky-800 hover:bg-slate-200" placeholder="Subir Foto" onChange={handleImageChange} />
                </div>
                {/* seleccione genero */}
                <div className="flex items-center justify-center mt-8">
                    <div className="bg-[url('../imgs/arrows.svg')] w-[10px] h-[18px] flex justify-center cursor-pointer"></div>
                    <select className="w-[360px] pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 placeholder:text-sky-800 hover:bg-slate-200" onChange={(e) => setGenderId(e.target.value)} defaultValue="">
                        <option value="" disabled hidden>Seleccione Género...</option>
                        {gender_ids.map((gender) => (
                            <option key={gender._id} value={gender._id}>{gender.name_genders}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleRegistro} className="w-[360px] h-[50px] flex absolute bottom-8 bg-[url('../imgs/btn-save.svg')]"></button>
                {message && <p>{message}</p>}
            </div>
        </>
    );
}

export default AñadirComponent;