import { useEffect, useState } from 'react'
import { useParams,  Link} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useProduct } from "../context/ProductContext"
import { useOrder } from '../context/OrderContext'

import Product from '../components/Product';

import { AiOutlineShop, AiOutlineShoppingCart } from 'react-icons/ai'
import NavBar from '../components/NavBar';

const Shop = () => {

  const [wasCalled, setWasCalled] = useState(false);
  const params = useParams()

  const { getShopByUsername, shop } = useAuth()
  const { products, getProducts } = useProduct()
  const { orderedProducts } = useOrder()
  
  const callData = async (username)=>{
    await getShopByUsername(username)
  }

  useEffect(()=>{
    callData(params.name)
  }, [params.name])
  if( shop && !wasCalled ) {
    getProducts(shop.user)
    setWasCalled(true)
  }

  if (!shop){
    return <div className='bg-amber-300 min-h-[100dvh] pt-[10vh] flex flex-col items-center'>
      Cargando...
      </div>
  }

  return (
    <div>
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
          shop?.photoURL
          ?<img src={shop.photoURL} class='object-cover h-12 w-12 rounded-full' alt="avatar"></img>
          : <AiOutlineShop className='h-12 w-12 text-white'/>
          }
          <h2 className='text-3xl font-bold mx-2 text-white'>
          {
            shop?.displayName
            ? shop.displayName
            : 'Bienvenido'
          }
          </h2>
        </div>
        <div className='p-4 my-4 w-full'>
        <Link
        to={`/schedule/${params.name}`}
        className='bg-orange-500 rounded-xl p-4 text-xl font-bold text-md text-white transition-all'>
          Agendar un turno
        </Link>
        </div>
       </div>
        <div className='w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
        {
        products &&
        products.map((product)=>(
          <Product product={product} key={product.id}/>
        ))
        }
        </div>
        </div>
    </div>
  )
}

export default Shop