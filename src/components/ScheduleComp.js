import { useState } from 'react'
import { useParams } from "react-router-dom";

import { useAppointment } from "../context/AppointmentsContext"; 
import { useAuth } from '../context/AuthContext';

import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai'


const ScheduleComp = ({selectedDay, selectedMonth, selectedYear, dates}) => {

  const [value, setValue] = useState({
    name: null,
    surname: null,
    phone: null,
    reason: null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [screenDates, setScreenDates] = useState(dates)
  const schedules = [8,9,10,11,16,17,18,19]

  const params = useParams()

  const { appointments, addAppointment, cancelAppointment } = useAppointment()

  const { user } = useAuth()

  const handleClick = async (schedule)=>{
    try {
      if(screenDates.includes(`${selectedDay}/${selectedMonth}/${selectedYear}, ${schedule}:00`)){
        const selected = appointments.filter((appointment=> appointment.schedule === `${selectedDay}/${selectedMonth}/${selectedYear}, ${schedule}:00`))
        await cancelAppointment(selected[0].id)
        setScreenDates(screenDates.filter((screenDate)=> screenDate !== `${selectedDay}/${selectedMonth}/${selectedYear}, ${schedule}:00`))
      }
      else{
        setSelectedDate(schedule)
        // await addAppointment(`${selectedDay}/${selectedMonth}/${selectedYear}, ${schedule}:00`, params.name)
        // setScreenDates([...screenDates, `${selectedDay}/${selectedMonth}/${selectedYear}, ${schedule}:00`])
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleSubmit = async (e) =>{
        e.preventDefault()
        setIsLoading(true)
        if(params.name){
          await addAppointment(value,`${selectedDay}/${selectedMonth}/${selectedYear}, ${selectedDate}:00`, params.name, null)  
        }
        else{  
          await addAppointment(value,`${selectedDay}/${selectedMonth}/${selectedYear}, ${selectedDate}:00`, null , user.uid) 
        }
        setScreenDates([...screenDates, `${selectedDay}/${selectedMonth}/${selectedYear}, ${selectedDate}:00`])
        setSelectedDate(null)
  }

  return (
    <div className="m-4 text-2xl">
      {

        selectedDate !== null &&
        <div className='fixed w-full bg-[linear-gradient(#f97316,#fdba74)] h-[100vh] flex flex-col top-0 left-0'>
          <div className='font-bold px-6 text-3xl text-white rounded-3xl text-center pt-3 pb-4'>
            <AiOutlineClose onClick={()=>{setSelectedDate(null)}} className='text-4xl cursor-pointer my-2 '/>
            📝 Agendar un turno el dia {selectedDay}/{selectedMonth} a las {selectedDate}:00
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col bg-amber-200 px-4 justify-around w-[90%] h-[75vh] m-auto rounded-3xl'>
            <div>
              <label htmlFor="name" className='mt-2 text-xl font-bold'>Nombre</label>
            <input
            id='name'
            required
            className="p-4 shadow-md shadow-black/80 rounded-2xl mt-2 outline-none focus:outline-none w-[90%] transition-all"
            placeholder='Facundo'
            onChange={(e) => setValue({ ...value, name: e.target.value })}
            />

            </div>
            
            <div>
            <label htmlFor="surname" className='mt-2 text-xl font-bold'>Apellido</label>
            <input
            id='surname'
            required
            className="p-4 shadow-md shadow-black/80 rounded-2xl mt-2 outline-none focus:outline-none w-[90%] transition-all"
            placeholder='Cordoba'
            onChange={(e) => setValue({ ...value, surname: e.target.value })}
            />
            </div>

           {
            params.name 
            &&
            <div>
            <label htmlFor="phone" className='mt-2 text-xl font-bold'>Numero de telefono</label>
            <input
            id='phone'
            type='number'
            required
            className="p-4 shadow-md shadow-black/80 rounded-2xl mt-2 outline-none focus:outline-none w-[90%] transition-all"
            placeholder='3408681915'
            onChange={(e) => setValue({ ...value, phone: e.target.value })}
            />
            </div>
           }


            <button type='submit' className='mt-6 py-4 px-12 bg-orange-500 font-bold hover:bg-orange-600 shadow-md shadow-black/60 transition-all rounded-3xl text-white'>
              {
                isLoading 
                ? <AiOutlineLoading3Quarters className='animate-spin h-12 w-5 m-auto'/>
                : 'Reservar'
              }
            </button>
          </form>
        </div>
      }
      <div className="flex flex-col items-center w-[85vw]">
        <div className='h-[50px] text-2xl font-bold text-center'>
          Turnos disponibles
        </div>
      {
         schedules.map((schedule)=>
         <div
         onClick={()=>{
          handleClick(schedule)
         }}
         className={
           screenDates.includes(`${selectedDay}/${selectedMonth}/${selectedYear}, ${schedule}:00`)
          ?'hidden'
          :'flex items-center justify-center w-[80vw] h-[80px] my-2 bg-amber-200 transition-all cursor-pointer rounded-2xl hover:bg-amber-400'
         }
         >
           {schedule}:00hs
         </div>
         )
      }
      </div>
    </div>
  )
}

export default ScheduleComp