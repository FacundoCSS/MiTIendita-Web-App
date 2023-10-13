import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const About = () => {
  return (
    <div className="w-full min-h-[100vh] py-8 bg-[linear-gradient(#fbbf24,#fde68a)]">
      <Link to='/'>
        <AiOutlineArrowLeft className='bg-orange-500 text-white h-12 w-12 rounded-full p-2 fixed cursor-pointer mx-8 '/>
      </Link>
      <h1 className='font-bold text-3xl text-center py-12'>
       🙌 Nosotros
      </h1>
      
      <div className='bg-white w-[90vw] max-w-md font-semibold flex flex-col items-center justify-center py-6 px-10 m-auto mb-4 rounded-3xl'>
        En Mi Tiendita, estamos decididos a transformar la forma en que los negocios locales operan en San Cristóbal y más allá. Comenzamos con una simple observación: en nuestra ciudad, encontrar información sobre la disponibilidad de productos en los locales locales era un desafío.
      </div>

      <div className='bg-white w-[90vw] max-w-md font-semibold flex flex-col items-center justify-center py-6 px-10 m-auto mb-4 rounded-3xl'>
        Nuestra misión es empoderar a los negocios locales, brindándoles las herramientas para gestionar sus citas y ofrecer su stock de manera eficiente y accesible en línea. Queremos ser la solución a los desafíos que enfrentan las tiendas locales en un mundo cada vez más digital.
      </div>

      <div className='bg-white w-[90vw] max-w-md font-semibold flex flex-col items-center justify-center py-6 px-10 m-auto mb-4 rounded-3xl'>
        La gestión de citas es esencial para maximizar la eficiencia y la satisfacción del cliente, y ofrecer stock en línea permite a los negocios llegar a más clientes y competir en el mercado en línea. En Mi Tiendita, creemos que cada tienda local debería tener la oportunidad de crecer y prosperar.
      </div>

      <div className='bg-white w-[90vw] max-w-md font-semibold flex flex-col items-center justify-center py-6 px-10 m-auto mb-4 rounded-3xl'>
        Gracias por ser parte de nuestra comunidad. Juntos, estamos construyendo un San Cristóbal más conectado y facilitando la vida de los negocios locales. 
      </div>
    </div>
  )
}

export default About