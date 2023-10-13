import {useState} from 'react';
import {useNavigate } from "react-router-dom";
import {AiOutlineShop} from 'react-icons/ai'
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast'
import {VscError} from 'react-icons/vsc'

const UpdateUser = () => {
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
                navigate("/payment");
            } catch (error) {
                console.log(error)
                handleError(error.message);
            }
        }
    }
  return (
    <div className='w-full h-[100dvh] bg-amber-300 flex'>
        <form
        onSubmit={handleSubmit}
        className='h-[100vh] w-full font-semibold flex flex-col items-center justify-center my-2'
        >
            <div className="w-[90%] max-w-[600px] my-4 flex px-2 py-6 bg-white text-xl font-bold rounded-2xl shadow-lg shadow-black/50">
                <h2 className='text-2xl text-center font-bold'>✅Completa tu perfil!</h2>
            </div>
            <label 
            htmlFor="file-1"
            className='p-[15px] bg-white rounded-full text-neutral-500 hover:bg-neutral-300  shadow-lg shadow-black/50
            hover:text-neutral-700 cursor-pointer'
            >
            {
                state
                ?<div className='resultado'></div>  
                :
                user?.photoURL
                ?<img src={user.photoURL} class='object-cover h-32 w-32 rounded-full' alt="avatar"></img>
                : <AiOutlineShop className='h-32 w-32'/>
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
            <div className="w-[90%] max-w-[600px] my-4 shadow-lg shadow-black/50 rounded-2xl px-8 py-6 bg-white text-xl">
                <label
                    htmlFor="username"
                    className="block text-neutral-800 text-2xl font-bold my-2"
                >
                    Nombre de usuario
                </label>
                <input
                id="username"
                name='username'
                required
                className="w-full appearance-none border rounded p-4 my-2 text-gray-700 leading-tight focus:outline-none shadow-md shadow-black/40 focus:shadow-black/60 mb-4"
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
                required
                className="w-full shadow appearance-none border rounded my-2 p-4 text-gray-700 leading-tight focus:outline-none shadow-md shadow-black/40 focus:shadow-black/60 mb-4"
                placeholder='Mi Tiendita'
                onChange={(e) => setValue({ ...value, displayName: e.target.value })}
                />
                <button 
                type='submit' 
                className="bg-orange-500 my-3 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline">
                    Guardar y continuar
                </button>
            </div>
        </form>
    </div>
  )
}

export default UpdateUser