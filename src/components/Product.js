import {useState} from 'react'
import {useProduct} from '../context/ProductContext'
import toast from 'react-hot-toast'

import AddProductForm from './AddProductForm';
import ProductCard from './ProductCard'

import {AiOutlineClose, AiOutlineArrowLeft} from 'react-icons/ai'
import {FiShoppingBag, FiEdit, FiTrash2} from 'react-icons/fi'

const Product = ({product, myshop}) => {

  const [isOpenAddProduct, setIsOpenAddProduct] = useState(false)
  const [isOpenProduct, setIsOpenProduct] = useState(false)

  const {deleteProduct} = useProduct()


  const handleDelete= (id, name)=>{
    toast(t=>(
        <div>
            <p className='text-white'>¿Seguro que quieres eliminar este producto?<strong>{name}</strong> </p>
            <div>
                <button 
                className='bg-red-500 hover:bg-red-400 px-3 py-2 rounded-sm text-sm mx-2 text-white'
                onClick={()=> {
                    deleteProduct(id)
                    toast.dismiss(t.id)
                }}
                >
                    Eliminar
                </button>
                <button className='bg-slate-400 hover:bg-slate-500 px-3 py-2 rounded-sm mx-2 text-white'
                onClick={()=> toast.dismiss(t.id)}
                >
                    Cancelar
                </button>
            </div>
        </div>
    ), {
        style:{
            background: "#202020"
        }
    })
  }
  return (
    <div className='w-full'>
        {
        isOpenProduct &&
        <div className='fixed top-0 left-0 w-full min-h-screen flex justify-center'>
        <div className='fixed top-0 left-0 min-h-screen w-full bg-black/[0.15] flex z-20' onClick={() => setIsOpenProduct(false)}></div>
        <div className='fixed top-0 left-0 w-full min-h-[100vh] text-white bg-gradient-to-br from-[#171717] to-[#fb923c] z-30 transition-all overflow-y-auto'>
        
                <div>
                <div 
                  className="text-3xl m-4 hover:bg-black/30 rounded-full inline-block cursor-pointer fixed"
                  onClick={(e)=>{
                      e.preventDefault()
                      setIsOpenProduct(false)
                  }}
                  > 
                      <AiOutlineArrowLeft/>
                  </div>
                </div>
                <div className='h-full'>
                    <ProductCard setIsOpenProduct={setIsOpenProduct} product={product}/>
                </div>
            </div>
        </div>
        }
      {
      isOpenAddProduct &&
      <div
      className='fixed top-0 left-0 w-full min-h-[100vh] text-white flex justify-center'
      >
          <div  
          className='fixed top-0 left-0 min-h-[100vh] w-full bg-black/[.15] flex z-20'
          onClick={()=>{setIsOpenAddProduct(false)}}
          >
          </div>
          <div 
          className='fixed top-0 left-0 w-full mt-[10vh] h-[90vh] text-black bg-[linear-gradient(#171717,#fb923c)] z-30 transition-all overflow-y-auto'>
              <div>
                  <div 
                  className="text-3xl m-5 hover:bg-black/30 rounded-full inline-block cursor-pointer fixed text-white"
                  onClick={(e)=>{
                      e.preventDefault()
                      setIsOpenAddProduct(false)
                  }}
                  > 
                      <AiOutlineClose/>
                  </div>
              </div>
              <div className='h-full'>
                  <AddProductForm setIsOpenAddProduct={setIsOpenAddProduct} initialValues={product}/>
              </div>
          </div>
      </div>
      }
      <div 
      className='m-auto w-[310px] min-h-[240px] cursor-pointer bg-white flex flex-col items-center rounded-3xl mb-6 py-2 shadow-lg shadow-black/40 hover:shadow-black/60 transition-all'
      onClick={(e)=>{
        e.preventDefault()
        setIsOpenProduct(true)
      }}
      >
          <div className='w-full h-[35%] flex'>
          {product?.imageURL 
              ? <div className='m-auto'><img className='object-cover h-28 w-28 rounded-2xl m-auto' src={product.imageURL} alt={product.name}/></div> 
              :<FiShoppingBag className='h-20 w-20 text-neutral-800 m-auto'/>
              }    
          </div>
          <div className='font-bold text-xl'>
            {product.name}
          </div>
          <p className='text-lg text-center px-2'>
            {product.description}
          </p>
          <div className='text-lg font-bold'>
            ${product.price}
          </div>
          { myshop && 
            <div className='w-full h-24 text-center flex items-center justify-around px-[50px]'>
              <div 
              className='flex items-center justify-center text-xl bg-black/10 p-[10px] rounded-3xl cursor-pointer hover:bg-black/30'
              onClick={(e)=>{
                  e.stopPropagation();
                  setIsOpenAddProduct(true)
              }}
              >
                  <FiEdit/>
              </div>
              <div 
              className='flex items-center justify-center text-xl bg-black/10 p-[10px] rounded-3xl cursor-pointer hover:bg-black/30'
              onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(product.id, product.name) 
              }}
              >
                  <FiTrash2/>
              </div>
            </div>
          }
      </div>
    </div>
  )
}

export default Product