import React from "react"
import { Link } from "react-router-dom"

const ConsultaComponent = () => {
    return (
        <>
            <div className="flex relative bg-[url('../../imgs/bg.svg')] w-[400px] h-[785px] justify-center items-center flex-col">
                <div className="flex absolute flex-row text-white top-10">
                    <Link to='/lista' className="bg-[url('../../imgs/btn-back.svg')] w-[12px] h-[20px] flex absolute right-56 cursor-pointer"></Link>
                    <p>Consultar Mascota</p>
                    <Link to='/' className="bg-[url('../../imgs/btn-close.svg')] w-[34px] h-[34px] flex absolute left-52 cursor-pointer"></Link>
                </div>
                <div className="bg-[url('../../imgs/photo-lg-1.svg')] w-[152px] h-[153px] flex absolute top-32"></div>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-row absolute w-[350px] top-[350px]">
                        <div className="flex bg-slate-400 w-5/12 h-[55px] text-white rounded-l-xl items-center pl-4 text-lg">Nombre:</div>
                        <div className="flex bg-slate-300 w-7/12 h-[55px] text-sky-800 rounded-r-xl items-center pl-4 text-lg">Reigner</div>
                    </div>
                    <div className="flex flex-row absolute w-[350px] h-12 bottom-[320px]">
                        <div className="flex bg-slate-400 w-5/12 h-[55px] text-white rounded-l-xl items-center pl-4 text-lg">Raza:</div>
                        <div className="flex bg-slate-300 w-7/12 h-[55px] text-sky-800 rounded-r-xl items-center pl-4 text-lg">Bulldog</div>
                    </div>
                    <div className="flex flex-row absolute w-[350px] h-12 bottom-[254px]">
                        <div className="flex bg-slate-400 w-5/12 h-[55px] text-white rounded-l-xl items-center pl-4 text-lg">Categoría:</div>
                        <div className="flex bg-slate-300 w-7/12 h-[55px] text-sky-800 rounded-r-xl items-center pl-4 text-lg">Perro</div>
                    </div>
                    <div className="flex flex-row absolute w-[350px] h-12 bottom-[188px]">
                        <div className="flex bg-slate-400 w-5/12 h-[55px] text-white rounded-l-xl items-center pl-4 text-lg">Género:</div>
                        <div className="flex bg-slate-300 w-7/12 h-[55px] text-sky-800 rounded-r-xl items-center pl-4 text-lg">Macho</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConsultaComponent