import { useState } from 'react';
import { Link } from "react-router-dom";
import toast from 'react-hot-toast'


import { useAppointment } from '../context/AppointmentsContext';
import { useAuth } from "../context/AuthContext";

import NavBar from '../components/NavBar';

import { AiOutlineArrowLeft, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'

const Appointments = () => {

    const [wasCalled, setWasCalled] = useState(false)
  
    const { appointments, getAppointmentsById, cancelAppointment } = useAppointment()
    const { user } = useAuth();


    const handleDelete= (id)=>{
      toast(t=>(
          <div>
              <p className='text-white text-xl font-semibold'>¿Seguro que quieres eliminar este turno?</p>
              <div>
                  <button 
                  className='bg-red-500 hover:bg-red-400 px-3 py-2 rounded-sm text-sm mx-2 text-white'
                  onClick={()=> {
                      cancelAppointment(id)
                      toast.dismiss(t.id)
                  }}
                  >
                      Eliminar
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
  
    const callData = async ()=>{
      await getAppointmentsById(user.uid);
      if(appointments){
        setWasCalled(true);
      }
    }
  
    if (user && !wasCalled){
      callData()
    }
  
    return (
      <div>
          <NavBar/>
          <div 
          className='bg-[linear-gradient(#fbbf24,#fde68a)] pt-[10vh] min-h-[100vh] flex flex-col items-center '
          >
            <div className='mr-auto pl-4 pt-4 flex'>
              <Link to='/'>
                <AiOutlineArrowLeft className='bg-orange-500 text-white h-12 w-12 rounded-full p-2 cursor-pointer'/>
              </Link>
            </div>
            <div className='pt-[3vh] flex flex-col items-center ' >
              <div className='flex items-center justify-between h-[100px] w-[90vw] px-4 text-white bg-orange-500 font-bold text-2xl rounded-3xl'>
                <div className='flex items-center'>📅 Turnos</div>
                {
                  <Link to={`/schedule`}>
                    <AiOutlinePlus className='mr-3 bg-white rounded-full p-2 text-orange-600 h-10 w-10 cursor-pointer'/>
                  </Link>
                }
              </div>
              <div>
                {
                    wasCalled &&
                    appointments.length !== 0 && 
                    appointments.map((date)=>
                    <div className='flex justify-between items-center min-h-[100px] bg-white w-[90vw] text-black text-xl p-4 shadow-md shadow-black/60 rounded-3xl my-3'>
                        <div>
                          <div className='font-bold'>
                            🕒 {date.schedule}
                          </div>
                          <div>
                            🧑 {date.name} {date.surname}
                          </div>
                          <div>
                            {
                              date.phone &&
                              `📞${date.phone}`
                            }
                          </div>
                        </div>
                        <button 
                          onClick={()=>{handleDelete(date.id)}}
                          className='shadow-md shadow-black/60 p-2 text-3xl text-white bg-orange-500 rounded-2xl flex hover:shadow-black/80'>
                            <AiOutlineDelete/>
                          </button>
                    </div>   
                    )
                }
              </div>
            </div>
          </div>
      </div>
    )
  }
  
export default Appointments