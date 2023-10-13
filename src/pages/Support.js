import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const Support = () => {
  return (
    <div className="w-full min-h-[100vh] py-8 bg-[linear-gradient(#fbbf24,#fde68a)]">
      <Link to='/'>
        <AiOutlineArrowLeft className='bg-orange-500 text-white h-12 w-12 rounded-full p-2 fixed cursor-pointer mx-8 '/>
      </Link>
      <h1 className='font-bold text-3xl pb-8 text-center'>
       🧭 Soporte
      </h1>
      
      <div className='bg-white w-[90vw] max-w-md font-semibold flex flex-col items-center justify-center py-6 px-10 m-auto mb-4 rounded-3xl'>
      Estamos aquí para ayudarte. Si tienes alguna pregunta, comentario o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte: 
      </div>
      <div className='bg-white w-[90vw] max-w-md font-semibold flex flex-col items-center justify-center py-6 px-10 m-auto mb-4 rounded-3xl'>
      Directamente a través de <p>📧 facucordoba200@gmail.com</p> o <p>📞 3408681915</p> 
      </div>
      <div className='bg-white w-[90vw] max-w-md font-semibold flex flex-col items-center justify-center py-6 px-10 m-auto rounded-3xl'>
        Estamos disponibles para asistirte en cualquier momento. ¡Gracias por confiar en nosotros!
      </div>
    </div>
  )
}

export default Support