import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Settings = () => {

  const {logout} = useAuth()

  const navigate = useNavigate()

  const handleSignOff= ()=>{
    toast(t=>(
        <div>
            <p className='text-white mb-2'>¿Seguro que quieres Cerrar sesión?</p>
            <div>
                <button 
                className='bg-red-500 hover:bg-red-400 px-3 py-2 rounded-sm text-sm mx-2 text-white'
                onClick={()=> {
                    logout()
                    navigate('/')
                }}
                >
                    Cerrar sesión
                </button>
                <button className='bg-slate-400 hover:bg-slate-500 px-3 py-2 rounded-sm mx-2 text-white'
                onClick={()=> toast.dismiss(t.id)}
                >
                    Cancelar
                </button>
            </div>
        </div>
    ), {
        style:{
            background: "#202020"
        }
    })
  }

  return (
    <div className='bg-white text-2xl w-full h-[100vh] px-4 py-6'>
      <Link to='/'>
        <AiOutlineArrowLeft className='h-12 w-12 cursor-pointer' />
      </Link>
      <h1 className='font-bold text-3xl my-8'>
        ⚙ Configuración
      </h1>
      <div className='border-y-2 boder-black m-4'>
        <h2 className='font-bold p-2'>
         👥 Cuenta
        </h2>
        <div 
        onClick={()=>{
          navigate('/settings/edit')
        }}
        className='py-4 px-16 border-t-2 cursor-pointer'
        >
          Editar Perfil
        </div>
        <div 
        onClick={()=>{
          navigate('/settings/delete')
        }}
        className='py-4 px-16 border-t-2 cursor-pointer'
        >
          Eliminar cuenta
        </div>
      </div>
      <div 
      onClick={()=>{
          navigate('/settings/support')
      }}
      className='border-b-2 font-bold p-2 m-4 cursor-pointer'
      >
        📞Ayuda y soporte
      </div>
      <div 
      onClick={()=>{
          navigate('/settings/about')
      }}
      className='border-b-2 font-bold p-2 m-4 cursor-pointer'
      >
        🙌 Nosotros
      </div>
      <div 
      onClick={handleSignOff}
      className='border-b-2 font-bold p-2 m-4 cursor-pointer'>
        🚪 Cerrar sesión
      </div>
    </div>
  );
};

export default Settings