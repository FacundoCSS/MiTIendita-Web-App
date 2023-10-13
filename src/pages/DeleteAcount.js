import React, { useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const DeleteAcount = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { deleteShop } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    deleteShop(user).then(()=>{
      navigate('/')
    })
  }

  return (
    <div className="w-full min-h-[100vh] py-14 bg-[linear-gradient(#fbbf24,#fde68a)] text-lg">
    <Link to='/'>
      <AiOutlineArrowLeft className='bg-orange-500 text-white h-12 w-12 rounded-full p-2 fixed cursor-pointer mx-8 '/>
    </Link>
    <h1 className='font-bold text-3xl pb-8 text-center'>
    ⚠️ Eliminar cuenta
    </h1>
    <div className='bg-white w-[90vw] max-w-md font-semibold flex flex-col items-center justify-center py-6 px-10 m-auto mb-6 rounded-3xl'>
       Entendemos que a veces las circunstancias cambian o las necesidades evolucionan. Si has decidido eliminar tu cuenta en Mi Tiendita, estamos aquí para ayudarte. Ten en cuenta que esta acción es irreversible y se eliminarán todos tus datos y ajustes. Por favor, piénsalo cuidadosamente antes de proceder.
    </div>
    <div className='bg-white w-[90vw] max-w-md font-semibold flex flex-col items-center justify-center py-6 px-10 m-auto mb-6 rounded-3xl'>
     ❗❗ Ten en cuenta que la eliminación de tu cuenta eliminará todos tus datos, incluyendo tu historial de compras, citas y configuraciones. No podrás recuperar esta información una vez que la cuenta sea eliminada. Si estás seguro de tu decisión, procede con precaución
    </div>
    <form
    onSubmit={(e)=>{
      handleSubmit(e)
    }}
    className='bg-white w-[90vw] max-w-md font-semibold flex flex-col items-center justify-center py-6 px-10 m-auto mb-6 rounded-3xl'
    >
      <div>
        Porfavor vuelve a iniciar sesión para completar esta operación
      </div>
      <label
      htmlFor="email"
      className="block text-gray-700 text-2xl font-bold mb-2 mt-4"
      >
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        required
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="w-full shadow appearance-none border rounded p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="tuemail@compania.tld"
      />

      <label
        htmlFor="password"
        className="block text-gray-700 text-2xl font-bold mb-2 mt-4"
      >
        Contraseña
      </label>
      <input
        type="password"
        name="password"
        id="password"
        required
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="w-full shadow appearance-none border rounded p-4 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="*************"
      />

    <button
    type='submit'
    className='bg-red-500 text-white text-2xl rounded-xl p-4 m-auto w-64 text-center cursor-pointer'
    >
      Eliminar cuenta
    </button>
    </form>
  </div>
  )
}

export default DeleteAcount