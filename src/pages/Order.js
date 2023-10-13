import { Link } from 'react-router-dom'
import OrderCard from '../components/OrderCard'
import { useOrder } from '../context/OrderContext'

import { AiOutlineArrowLeft } from 'react-icons/ai'

const Order = ()=>{

    const {orderedProducts, price} = useOrder()

    return (
    <div>
        <div className='min-h-[100dvh] w-full bg-[linear-gradient(#fbbf24,#fde68a)] z-20 text-3xl transition-all overflow-auto'>
            <Link to='/'>
              <AiOutlineArrowLeft className='bg-orange-500 text-white h-12 w-12 rounded-full p-2 cursor-pointer m-4'/>
            </Link>
          <div 
          className='w-full min-h-[100dvh] text-black text-3xl flex flex-col transition-all items-center p-4 overflow-auto'
          >
            <div className='flex items-center justify-between min-h-[100px] w-[90vw] px-4 py-4 text-white bg-orange-500 font-bold text-2xl rounded-3xl'>
              🛒 Tu carrito ${price} 
              <Link 
              className='bg-white p-3 text-black rounded-2xl font-bold shadow-md shadow-black/30 cursor-pointer'
              to='/add-order'
              >
                Ordenar Carrito
              </Link>
            </div>
            <div className='flex flex-col items-center w-full p-3'>
              
              {
                  orderedProducts.map((orderedProduct)=>{
                      return <OrderCard orderedProduct={orderedProduct} key={orderedProduct.product} id={orderedProduct.product}/>
                  })
              }
            </div>
        </div>
      </div>
    </div>
)
}

export default Order