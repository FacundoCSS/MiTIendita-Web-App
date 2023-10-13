import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

import { useOrder } from '../context/OrderContext'


import { AiOutlineLoading3Quarters, AiOutlineArrowLeft, AiFillCheckCircle } from 'react-icons/ai'

const AddOrder = () => {
  const [value, setValue] = useState({
    name: null, 
    surname: null, 
    email: null, 
    phone_number: null, 
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const {setOrderedProducts, addOrder} = useOrder()

  const handleSubmit = async ()=>{
    setIsLoading(true)
    const res = await addOrder(value)
    if (res === true){
      toast(t=>(
        <div className='flex text-white' 
        onClick={()=>{
          setOrderedProducts([])
          navigate('/')
          toast.dismiss(t.id)
        }}>
            <div className='w-[20%] h-full flex items-center'>
                <AiFillCheckCircle className='text-lime-400 w-8 h-8'/>
            </div>
            <div className='w-[80%]'>
                <div className='font-semibold text-2xl text-neutral-300'>Hemos realizado tu orden con exito </div>
                <div  className='font-semibold text-2xl text-lime-400 cursor-pointer'> Haz click aquí para volver a la tienda</div>
            </div>
        </div>
      ), {
          style:{
              background: "#121212",
          }
      })
    }
  }

  return (
    <div className=' bg-[linear-gradient(#fbbf24,#fde68a)] min-h-[100vh] w-full font-bold p-4'>
      <Link
      to='/order'
      > 
        <AiOutlineArrowLeft className='bg-orange-500 text-white h-12 w-12 rounded-full p-2 cursor-pointer'/>
      </Link>
      <div>
          <div>
          <form
          className='grid grid-cols-1 sm:grid-cols-2 justify-items-center items-center mt-10 w-[90vw] bg-white m-auto rounded-3xl py-6'
          >
            <div className='flex flex-col items-center'>
              <label htmlFor="name" className='mt-4 text-xl text-center'>Nombre</label>
              <input
                name='name' 
                id='surname'
                autoComplete="off"
                placeholder="Nombre"
                className="p-4 shadow-md shadow-black/60 rounded-2xl mt-1 outline-none focus:outline-none transition-all"
                onChange={(e) => setValue({ ...value, name: e.target.value })}
              />
            </div>

            <div className='flex flex-col items-center'>
              <label htmlFor="surname" className='mt-4 text-xl text-center'>Apellido</label>
              <input
                name='surname'
                id='surname' 
                autoComplete="off"
                placeholder="Apellido"
                className="p-4 shadow-md shadow-black/60 rounded-2xl mt-1 outline-none focus:outline-none transition-all"
                onChange={(e) => setValue({ ...value, surname: e.target.value })}
              />
            </div>

            <div className='flex flex-col items-center'>
              <label htmlFor="email" className='mt-4 text-xl text-center'>Email</label>
              <input
                name='email'
                id='email' 
                autoComplete="off"
                placeholder="Apellido"
                className="p-4 shadow-md shadow-black/60 rounded-2xl mt-1 outline-none focus:outline-none transition-all"
                onChange={(e) => setValue({ ...value, email: e.target.value })}
              />
            </div>

            <div className='flex flex-col items-center'>
              <label htmlFor="phone_number" className='mt-4 text-xl text-center'>Numero de telefono</label>
              <input
              id='phone_number'
              type='number'
              required
              className="p-4 shadow-md shadow-black/60 rounded-2xl mt-1 outline-none focus:outline-none transition-all"
              placeholder='123456789'
              onChange={(e) => setValue({ ...value, phone_number: e.target.value })}
              />
            </div>

            <button 
            type='submit'
            onClick={(e)=>{
              e.preventDefault()
              handleSubmit()
            }} 
            className='mt-6 py-4 px-6 bg-orange-500 text-white shadow-md shadow-black/60 transition-all rounded-3xl text-xl'>
              {
                isLoading 
                ? <AiOutlineLoading3Quarters className='animate-spin h-12 w-5 m-auto'/>
                : 'Encargar'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddOrder