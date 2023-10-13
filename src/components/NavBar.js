import {useState} from 'react'
import { useAuth } from "../context/AuthContext";
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NavBar = () => {

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

  const { user, logout } = useAuth();

  const [isOpenNavBar, setIsOpenNavbar] = useState(false)

  const navigate = useNavigate()

  return (
    <div className='transition-all'>
      <div 
      className={
        isOpenNavBar
        ?'fixed h-[100vh] w-full bg-neutral-900 z-20 text-white text-3xl transition-all'
        :'fixed h-[100vh] w-[0px] bg-neutral-900 z-20 transition-all'
      }
      >
        <div className={
          isOpenNavBar
          ?'w-full h-[100vh] text-white text-3xl flex flex-col transition-all delay-150'
          :'w-full h-[100vh] invisible'
        }>
          <div className='h-[10vh] w-full flex items-center justify-between px-[20px] font-semibold'>
            <div className='transition-all duration-0'>Mi Tiendita</div>
            <AiOutlineClose className=' transition-all duration-0 cursor-pointer' onClick={()=>{setIsOpenNavbar(false)}}/>
          </div>
          {
            user
            ?
            <div>
              <div
              className='block p-2 w-64 m-4 border-2 font-bold border-orange-400 text-white rounded hover:bg-orange-400 cursor-pointer text-center'
              onClick={()=>{
                setIsOpenNavbar(false)
                navigate('/')
              }}
              >
              🌟 Tu Tiendita
              </div>
              <div
              className='block p-2 w-64 m-4 border-2 font-bold border-orange-400 text-white rounded hover:bg-orange-400 cursor-pointer text-center'
              onClick={()=>{
                setIsOpenNavbar(false)
                navigate('/orders')
              }}
              >
              📋 Ver Ordenes
              </div>
              <div
              className='block p-2 w-64 m-4 border-2 font-bold border-orange-400 text-white rounded hover:bg-orange-400 cursor-pointer text-center'
              onClick={()=>{
                setIsOpenNavbar(false)
                navigate('/appointments')
              }}
              >
              📅 Turnos
              </div>
              
              <Link
              className='block p-2 w-64 m-4 border border-white text-white rounded hover:bg-white hover:text-black font-semibold'     
              to='/settings'         
              >
                ⚙Configuración              
              </Link>

              <button 
              onClick={handleSignOff}
              className='block p-2 w-52 m-4 border border-white text-white rounded hover:bg-white hover:text-black font-semibold'
              >
                Cerrar sesión
              </button>
            </div>
            :
            <div>
              <div
              className='block p-2 w-64 m-4 border-2 font-bold border-orange-400 text-white rounded hover:bg-orange-400 cursor-pointer text-center'
              onClick={()=>{
                navigate('/signin')
              }}
              >
              🔐Iniciar Sesión
              </div>

              <div
              className='block p-2 w-64 m-4 border-2 font-bold border-orange-400 text-white rounded hover:bg-orange-400 cursor-pointer text-center'
              onClick={()=>{
                navigate('/signup')
              }}
              >
              📝Registrarse
              </div>
            </div>
          }
        </div>
      </div>
      <div className='fixed bg-neutral-900 h-[10vh] w-full text-3xl px-[20px] text-white font-semibold flex items-center'>
      <AiOutlineMenu
      className='absolute cursor-pointer z-10 select-none'
      onClick={()=>{setIsOpenNavbar(true)}}
      />
        <div className='m-auto'>Mi Tiendita</div>
      </div>
      
    </div>
  )
}

export default NavBar