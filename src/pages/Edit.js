import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'

import { useAuth } from "../context/AuthContext";

import {VscError} from 'react-icons/vsc'
import {AiOutlineArrowLeft, AiOutlineShop} from 'react-icons/ai'

const Edit = () => {

  const [value, setValue] = useState({
    image: null,
    displayName: null,
    username: null
  })
  const [state, setState] = useState(false)

  const { user, updateUser, checkIfUsernameIsAvailable, usernameAvailable } = useAuth()
  const navigate = useNavigate();

  const readFile = (file)=>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    return reader.addEventListener("load", e=>{
        let newImg = `<img src='${e.currentTarget.result}' class='object-cover h-32 w-32 rounded-full' alt="avatar"></img>`
        document.querySelector(".resultado").innerHTML=newImg
    })
  }

  const handleError= (message)=>{
    toast(t=>(
        <div className='flex text-white'>
            <div className='w-[20%] h-full flex items-center'>
                <VscError className='text-white w-8 h-8'/>
            </div>
            <div className='w-[80%]'>
                <div className='fonte-smibold text-[20px]'>Error</div>
                <div className='fonte-smibold text-[15px] text-neutral-300'>{message}</div>
            </div>
        </div>
    ), {
        style:{
            background: "#990000",
        }
    })
    }
    const handleSubmit  = async (e)=>{
        e.preventDefault();
        if(value.username.includes(" ")) handleError("El nombre de usuario no debe contener espacios")
        else if (usernameAvailable){
            try {
                await updateUser(value.image, value.displayName, value.username);
                navigate("/");
            } catch (error) {
                console.log(error)
                handleError(error.message);
            }
        }
    }
  return (
    <div className="w-full min-h-[100vh] py-8 bg-[linear-gradient(#fbbf24,#fde68a)]">
      <Link to='/'>
        <AiOutlineArrowLeft className='bg-orange-500 text-white h-12 w-12 rounded-full p-2 fixed cursor-pointer mx-8 '/>
      </Link>
      <h1 className='font-bold text-3xl pb-8 text-center'>
        🛠️ Editar Perfil
      </h1>
       <form
        onSubmit={handleSubmit}
        className='bg-white w-[90vw] max-w-md font-semibold flex flex-col items-center justify-center p-6 m-auto rounded-3xl'
        >
            <label
            htmlFor="file-1"
            className="block text-neutral-800 text-2xl font-bold my-2"
            >
                Imagen
            </label>

            <label 
            htmlFor="file-1"
            className='p-[15px] bg-neutra-100 rounded-full text-neutral-500 hover:bg-neutral-300  shadow-lg shadow-black/50
            hover:text-neutral-700 cursor-pointer'
            >
            {
                state
                ?<div className='resultado'></div>  
                :
                user?.photoURL
                ?<img src={user.photoURL} class='object-cover h-24 w-24 rounded-full' alt="avatar"></img>
                : <AiOutlineShop className='h-24 w-24'/>
            }
            
            </label> 
            
            <input
            type="file" 
            name="image" 
            className='absolute invisible'
            id="file-1"
            onChange={e => {
                readFile(e.target.files[0])
                setState(true)
                setValue({...value, image: e.target.files[0]})
            }}/>
            <label
                htmlFor="username"
                className="block text-neutral-800 text-2xl font-bold my-2"
            >
                Nombre de usuario
            </label>
            <input
            id="username"
            name='username'
            className="w-full appearance-none bg-neutral-100 rounded p-4 my-2 text-gray-700 leading-tight focus:outline-none mb-4"
            placeholder='MiTiendita'
            onChange={(e) => {
                setValue({ ...value, username: e.target.value })
                checkIfUsernameIsAvailable(e.target.value)
            }}
            />
            {
                !usernameAvailable
                &&
                <label
                htmlFor="username"
                className="block text-red-500 text-2xl font-bold"
            >
                    {value.username} ya está en uso!
                </label>
            }
            <label
                htmlFor="displayName"
                className="block text-neutral-800 text-2xl font-bold my-2"
            >
                Nombre de tu tienda
            </label>
            <input
            id="displayName"
            name='displayName'
            className="w-full appearance-none bg-neutral-100 rounded p-4 my-2 text-gray-700 leading-tight focus:outline-none mb-4"
            placeholder='Mi Tiendita'
            onChange={(e) => setValue({ ...value, displayName: e.target.value })}
            />
            <button 
            type='submit' 
            className="bg-orange-500 my-3 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline">
                Guardar y continuar
            </button>
          </form>
    </div>
  )
}

export default Edit