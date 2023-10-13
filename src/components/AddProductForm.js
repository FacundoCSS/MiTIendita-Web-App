import { useState } from 'react'
import { useProduct } from "../context/ProductContext"
import toast from 'react-hot-toast'

import { FiShoppingBag } from "react-icons/fi"
import { VscError } from "react-icons/vsc"
import { AiOutlineLoading3Quarters, AiFillClockCircle } from 'react-icons/ai'


const AddProductForm = ({setIsOpenAddProduct, initialValues}) => {
  const [value, setValue] = useState( 
  initialValues 
  ? {
    name: initialValues.name, 
    price: initialValues.price, 
    imageFile: null, 
    description: initialValues.description, 
    category: initialValues.category,
  }
  : {
    name: null, 
    price: null, 
    imageFile: null, 
    description: null, 
    category: null,
  })
  const [state, setState] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const { addProduct, updateProduct } = useProduct();

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
                <div className='font-semibold text-[20px]'>Error</div>
                <div className='font-semibold text-[15px] text-neutral-300'>{message}</div>
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
    try {
      if(!initialValues){
        toast(t=>(
          <div className='flex text-white'>
              <div className='w-[20%] h-full flex items-center'>
                  <AiFillClockCircle className='text-lime-400 w-8 h-8'/>
              </div>
              <div className='w-[80%]'>
                  <div className='font-semibold text-[15px] text-neutral-300'>Aguarda un momento mientras guardamos tu producto</div>
              </div>
          </div>
      ), {
          style:{
              background: "#121212",
          }
      })
        setIsOpenAddProduct(false)
        await addProduct(value);
      }
      else{
        setIsLoading(true)
        await updateProduct(value, initialValues.id);
        setIsOpenAddProduct(false)
      }
    } catch (error) {
      handleError(error.message);
      setIsLoading(false)
      console.log(error)
    }
  }
  return (
    <div className='w-full h-[90vh] '>      
    <h2 className='text-3xl font-bold text-center my-4 text-white'>
      Añade un producto
    </h2>
     <form className='w-[90%] max-w-[500px] rounded-2xl m-auto min-h-[80vh] bg-white grid grid-cols-1 sm:grid-cols-2 justify-items-center items-center font-semibold text-lg'>

     <div className='flex flex-col items-center'>
     <label htmlFor="file-1" className='mb-2 text-xl font-bold text-center'>Imagen</label>
      <label 
      htmlFor="file-1"
      className='p-2 bg-neutral-200 rounded-full text-neutral-500 hover:bg-neutral-300 hover:text-neutral-700 cursor-pointer'
      >
      {
          state
          ?<div className='resultado'></div>  
          :
          initialValues?.imageURL
          ?<img src={initialValues.imageURL} class='object-cover h-20 w-20 rounded-full' alt="avatar"></img>
          : <FiShoppingBag className='h-20 w-20'/>
      }
      
      </label> 
      
      <input 
      type="file" 
      name="imageFile" 
      className='absolute invisible'
      id="file-1"
      onChange={e => {
        readFile(e.target.files[0])
        setState(true)
        setValue({...value, imageFile: e.target.files[0]})
      }}
      />
     </div>

     <div className='flex flex-col items-center'>
     <label htmlFor="name" className='mt-4 text-xl font-bold text-center'>Nombre</label>
      <input
      id='name'
      required
      defaultValue={initialValues ? initialValues.name: ""}
      className="p-4 bg-neutral-100 rounded-2xl mt-1 outline-none focus:outline-none w-[70%] focus:w-[80%] transition-all"
      placeholder='Super Hamburguesa'
      onChange={(e) => setValue({ ...value, name: e.target.value })}
      />
     </div>

     <div className='flex flex-col items-center'>
    <label htmlFor="price" className='mt-4 text-xl font-bold text-center'>Precio</label>
      <input
      id='price'
      type='number'
      required
      defaultValue={initialValues ? initialValues.price: ""}
      className="p-4 bg-neutral-100 rounded-2xl mt-1 outline-none focus:outline-none w-[70%] focus:w-[80%] transition-all"
      placeholder='1000'
      onChange={(e) => setValue({ ...value, price: e.target.value })}
      />
    </div>
      
     <div className='flex flex-col items-center'>
       <label htmlFor="description" className='mt-4 text-xl font-bold text-center'>Descripción</label>
        <input
        id='description'
        required
        defaultValue={initialValues ? initialValues.description: ""}
        className="p-4 bg-neutral-100 rounded-2xl mt-1 outline-none focus:outline-none w-[70%] focus:w-[80%] transition-all"
        placeholder='Hamburguesa con queso'
        onChange={(e) => setValue({ ...value, description: e.target.value })}
        />
    </div>
      
     <div className='flex flex-col items-center'>
      <label htmlFor="category" className='mt-4 text-xl font-bold text-center'>Categoria</label>
      <input
      id='category'
      required
      defaultValue={initialValues ? initialValues.category: ""}
      className="p-4 bg-neutral-100 rounded-2xl mt-1 outline-none focus:outline-none w-[70%] focus:w-[80%] transition-all"
      placeholder='Hamburguesa'
      onChange={(e) => setValue({ ...value, category: e.target.value })}
      />
    </div>
    
    <button
     onClick={handleSubmit}
     className='py-4 px-12 text-2xl text-white font-semibold bg-[#fe8405] hover:bg-orange-600 shadow-md shadow-black/60 transition-all rounded-3xl'>
        {
          isLoading 
          ? <AiOutlineLoading3Quarters className='animate-spin h-12 w-5 m-auto'/>
          : 'Guardar'
        }
      </button>

     </form>
     
    </div>
  )
}

export default AddProductForm