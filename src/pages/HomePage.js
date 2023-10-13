import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useProduct } from "../context/ProductContext"
import { useAuth } from "../context/AuthContext";
import { useOrder } from '../context/OrderContext'

import NavBar from '../components/NavBar';
import AddProductForm from '../components/AddProductForm';
import Product from '../components/Product';

import { AiOutlineShop, AiOutlineClose, AiOutlineShoppingCart, AiOutlineLink } from 'react-icons/ai'

const HomePage = () => {



  const [isOpenAddProduct, setIsOpenAddProduct] = useState(false);
  const [wasCalled, setWasCalled] = useState(false);

  const { user, shop } = useAuth();
  const { products, getProducts } = useProduct()
  const { orderedProducts } = useOrder()

  const callData = async (id) =>{
    await getProducts(id)
    setWasCalled(true)
  }
  
  if (user && !wasCalled) callData(user.uid)

  const copiarAlPortapapeles = () => {
    navigator.clipboard.writeText( `http://mitiendita-online.web.app/shop/${shop.username}`)
    console.log('COPIADO')
  }

  return (
    <div>
      {
      isOpenAddProduct &&
      <div
      className='fixed top-0 left-0 container min-h-[100vh] text-white flex justify-center'
      >
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
                  <AddProductForm setIsOpenAddProduct={setIsOpenAddProduct}/>
              </div>
          </div>
      </div>
      }
      <NavBar/>
      <div className='bg-orange-400 min-h-[100dvh] pt-[10vh] flex flex-col'>
       <div className='bg-[linear-gradient(#171717,#fb923c)] pt-6 pb-14'>
       {
        orderedProducts.length !== 0 
        &&
        <Link to='/order' className='fixed top-[90vh] left-[80vw] p-4 rounded-full text-4xl bg-orange-500 text-white' >
            <AiOutlineShoppingCart/>
        </Link>
        }
        
        <div className='flex m-4 '>
        {
        user?.photoURL
        ?<img src={user.photoURL} class='object-cover h-12 w-12' alt="avatar"></img>
        : <AiOutlineShop className='h-12 w-12 text-white'/>
        }
        
        <h2 className='text-3xl font-bold mx-2 text-white'>
        {
          user?.displayName
          ? user.displayName
          : 'Bienvenido'
        }
        </h2>
        </div>
        
        <div className='p-4 mt-4 w-full'>
          <button 
          className='bg-orange-500 rounded-xl p-4 text-xl font-bold text-md text-white transition-all'
          onClick={()=>{setIsOpenAddProduct(true)}}
          >
            Añadir Producto
          </button> 
        </div>
        <div className='px-4 mb-4 w-full'>
        <button
          className='bg-sky-500 rounded-xl p-4 text-xl font-bold text-md text-white transition-all flex items-center'
          onClick={()=>{copiarAlPortapapeles(true)}}
          >
            Copiar link a tu tienda <AiOutlineLink className='w-8 h-8 ml-2'/>
          </button>
        </div>
       </div>
        <div className='w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
        {
        products.map((product)=>(
            <Product product={product} myshop={true} key={product.id} className='mx-12'/>
        ))
        }
        </div>
        
      </div>
    </div>
  )
}

export default HomePage