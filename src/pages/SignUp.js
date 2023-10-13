import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import { useAuth } from "../context/AuthContext";

import {AiFillEyeInvisible, AiOutlineArrowLeft, AiFillEye} from 'react-icons/ai'
import {VscError} from 'react-icons/vsc'

const SignUp = () => {

    const { signup } = useAuth();
    const [user, setUser] = useState({
        email: "",
        password: "",
      });

    const [inputType, setInputType] = useState('password')

      const navigate = useNavigate();
    
      const handleError= (message)=>{
        toast(t=>(
            <div className='flex text-white items-center'>
                <div className='w-[20%] h-full flex items-center'>
                    <VscError className='text-white w-8 h-8'/>
                </div>
                <div className='w-[80%]'>
                    <div className='font-semibold text-[15px]'>{message}</div>
                </div>
            </div>
        ), {
            style:{
                background: "#dc2626",
            }
        })
    }

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await signup(user.email, user.password);
          navigate("/update-user");
        } catch (error) {
          if(error.message =='Firebase: Error (auth/email-already-in-use).') handleError('Email ya en uso')
          else handleError(error.message);
        }
      };
    
      return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center text-black bg-amber-300">
          <div className="w-[90%]">
            <Link to='/' className="p-4 rounded-full bg-white text-2xl inline-block">
              <AiOutlineArrowLeft/>
            </Link>
          </div>
          <div className="w-[90%] max-w-[600px] mb-4 flex px-4 py-6 bg-white text-xl font-bold rounded-2xl shadow-lg shadow-black/50">
          🎁Aprovecha nuestro regalo: ¡un mes gratis!
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-[90%] max-w-[600px] shadow-lg shadow-black/50 rounded-2xl px-8 py-6 bg-white text-xl"
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-neutral-800 text-2xl font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full shadow appearance-none border rounded p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="tuemail@compania.tld"
              />
            </div>
    
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-neutral-800 text-2xl font-bold mb-2"
              >
                Contraseña
              </label>
              <div className="w-full flex border rounded items-center shadow">
              <input
                type={inputType}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="appearance-none w-[90%] p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="*************"
              />
              <div className="text-neutral-500">
                {
                  inputType == 'password'
                  &&
                  <AiFillEyeInvisible
                  className="h-8 w-8"
                  onClick={()=>setInputType('text')}
                  />
                }
                {
                  inputType == 'text'
                  &&
                  <AiFillEye 
                  className="h-8 w-8"
                  onClick={()=>setInputType('password')}
                  />
                }
              </div>
              </div>
            </div>
    
            <button className="bg-orange-400 my-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Registrarte
            </button>
          </form>
          <p className="w-[90%] max-w-[600px] my-2 flex justify-between px-4 py-6 bg-white text-xl font-bold rounded-2xl shadow-lg shadow-black/50">
            Ya tienes una cuenta?
            <Link to="/signin" className="text-neutral-800 hover:text-blue-900">
              Inicia sesión
            </Link>
          </p>
        </div>
      );
}

export default SignUp