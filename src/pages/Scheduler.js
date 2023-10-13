import { useState } from 'react';
import { useParams, Link } from "react-router-dom";


import { useAppointment } from '../context/AppointmentsContext';
import { useAuth } from '../context/AuthContext';

import NavBar from '../components/NavBar'
import ScheduleComp from '../components/ScheduleComp';

import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

const Scheduler = () => {

  const [wasCalled, setWasCalled] = useState(false)
  const [dates, setDates] = useState([])
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(10)
  const [selectedYear, setSelectedYear] = useState(2023)


  const params = useParams()

  const { getAppointments, getAppointmentsById } = useAppointment()
  const { user } = useAuth()

  const days = [];
  let monthDays =  selectedMonth === 1 ? 31:
  selectedMonth === 2 ? 28:
  selectedMonth === 3 ? 31:
  selectedMonth === 4 ? 30:
  selectedMonth === 5 ? 31:
  selectedMonth === 6 ? 30:
  selectedMonth === 7 ? 31:
  selectedMonth === 8 ? 31:
  selectedMonth === 9 ? 30:
  selectedMonth === 10 ? 31:
  selectedMonth === 11 ? 30:
  selectedMonth === 12 && 31
  for (let i = 1; i < monthDays +1; i++) {
      days.push(i);
  }


  const callData = async ()=>{
    
    let data;
  if(params.name){
    data = await getAppointments(params.name);
  }
  else{
    data = await getAppointmentsById(user.uid)
  }

    setDates([...dates, ...data.map(appointment => appointment.schedule)]);
    
    setWasCalled(true);
  }

  if (!wasCalled){
    callData()
  }

  return (
    <div>
        <NavBar/>
        <div 
        className='bg-[linear-gradient(#fbbf24,#fde68a)] pt-[10vh] min-h-[100vh] flex flex-col items-center '
        >
          <div className='mr-auto pl-4 pt-4 flex'>
            {

            params.name 
            ?
            <Link to={`/shop/${params.name}`}>
              <AiOutlineArrowLeft className='bg-orange-500 text-white h-12 w-12 rounded-full p-2 cursor-pointer'/>
            </Link>
            :
            <Link to='/appointments'>
              <AiOutlineArrowLeft className='bg-orange-500 text-white h-12 w-12 rounded-full p-2 cursor-pointer'/>
            </Link>
            }
          </div>
          <div className='pt-[3vh] flex flex-col items-center ' >
            <div className='flex items-center h-[100px] w-[90vw] text-white bg-orange-500 font-bold text-2xl rounded-t-3xl'>
              <div className='pl-4'>📅 Calendario</div>
              <div className='pl-6'>
                {selectedYear}
              </div>
            </div>
            <div className='bg-white py-4 px-4 w-[90vw] text-center flex items-center justify-between'>
              <div className='font-bold flex items-center text-2xl'>
                {
                  selectedDay && 
                  <AiOutlineClose
                    onClick={()=>{setSelectedDay(null)}}
                    className='cursor-pointer bg-orange-500 p-1 rounded-full text-4xl text-white mr-3'
                  />
                }
                {
                  selectedDay && `${selectedDay} de `
                }
                {
                  selectedMonth === 1 ? 'Enero':
                  selectedMonth === 2 ? 'Febrero':
                  selectedMonth === 3 ? 'Marzo':
                  selectedMonth === 4 ? 'Abril':
                  selectedMonth === 5 ? 'Mayo':
                  selectedMonth === 6 ? 'Junio':
                  selectedMonth === 7 ? 'Julio':
                  selectedMonth === 8 ? 'Agosto':
                  selectedMonth === 9 ? 'Septiembre':
                  selectedMonth === 10 ? 'Octubre':
                  selectedMonth === 11 ? 'Noviembre':
                  selectedMonth === 12 && 'Diciembre'
                }
              </div>
              {
                !selectedDay &&
                <div className='flex w-[150px] justify-around'>
                <div className='bg-orange-500 rounded-2xl p-2 text-white'>
                  <IoIosArrowBack
                  onClick={()=>{
                    if(selectedMonth === 1){
                      setSelectedMonth(12)
                      setSelectedYear(selectedYear - 1)
                    }
                    else{
                    setSelectedMonth(selectedMonth - 1)
                    }
                  }}
                  className='text-2xl cursor-pointer'/>
                </div>
                
                <div className='bg-orange-500 rounded-2xl p-2 text-white'>
                  <IoIosArrowForward
                  onClick={()=>{
                    if(selectedMonth === 12){
                      setSelectedMonth(1)
                      setSelectedYear(selectedYear + 1)
                    }
                    else{
                    setSelectedMonth(selectedMonth + 1)
                    }
                  }}
                  className='text-2xl cursor-pointer'
                  />
                </div>
              </div>
              }
            </div>
            {
              selectedDay
              ?
              <div className='w-[90vw] bg-white rounded-b-3xl mb-4'>
                {
                  wasCalled &&
                  <ScheduleComp selectedDay={selectedDay} selectedMonth={selectedMonth} selectedYear={selectedYear} dates={dates}/>
                }
              </div>
              :
              <div className='bg-white w-[90vw] grid grid-cols-7 justify-items-center rounded-b-3xl'>
              {
                days.map((day)=>
                <div
                onClick={()=>{
                  setSelectedDay(day)
                }}
                className='flex items-center w-10 h-10 justify-center my-2 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-75 cursor-pointer'>
                  {day}
                </div>)
              }
              </div>
            }
          </div>
        </div>
    </div>
  )
}

export default Scheduler