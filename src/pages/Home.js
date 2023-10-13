import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useAuth } from "../context/AuthContext";
import HomePage from './HomePage';

const Home = ()=>{
    const { user } = useAuth();
    const navigate = useNavigate()

    if (user) return <HomePage/>
    
    if (!user) return (
        <div className='min-h-[100vh]'>
            <NavBar/>
            <div className='bg-amber-300 font-semibold text-2xl min-h-[100vh] text-black pt-[12vh] px-8'>
                <h1 className='text-5xl text-neutral-900 font-extrabold my-3'>
                    Bienvenido a Mi Tiendita
                </h1>
                <div className='font-bold'>La solución completa para negocios locales:</div>
                <div><div className='font-bold'>📅 Gestión de citas:</div> Programa y administra citas fácilmente.</div>
                <div><div className='font-bold'>🛒 Ofrecer stock en línea:</div> Permite a tus clientes explorar y encargar productos a través de la aplicación.</div>
                <div><div className='font-bold'>📝Emite facturas:</div>Te facilitamos la gestión y registro de transacciones.</div>
                <div className='my-6'>
                    <button onClick={()=>navigate('/signup')} className='p-4 bg-orange-500 font-bold rounded-3xl text-white'>Comienza ahora</button>
                </div>
                <div className='font-bold'>¡No necesitas tarjetas de credito!</div>
            </div>
        </div>
    )
}
export default Home