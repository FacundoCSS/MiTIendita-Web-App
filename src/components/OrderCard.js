import { useState, useEffect } from 'react'

import { useProduct } from '../context/ProductContext'
import { useOrder } from '../context/OrderContext';

import { AiOutlineDelete, AiOutlineLoading3Quarters } from 'react-icons/ai'
import {FiShoppingBag} from 'react-icons/fi'

const OrderCard = ({orderedProduct, id}) => {
  const [product, setProduct] = useState()

  const {getProduct} = useProduct()
  const {deleteProduct, addPrice} = useOrder()

  const callData = async ()=>{
    const data = await getProduct(orderedProduct.product)
    setProduct(data.data())
  }

  useEffect(()=>{
    callData()
  },[])
  if(!product){
    return  <AiOutlineLoading3Quarters className='animate-spin h-12 w-5 m-auto text-neutral-900'/>
}
  return (
    <div className='flex justify-between items-center px-8 w-full rounded-3xl bg-white shadow-md shadow-black/50 my-4 hover:shadow-black/60 cursor-pointer'>

          <div className='flex'>
            {product?.imageURL 
                ? <img className='object-cover w-24 h-24 rounded-2xl m-auto' src={product.imageURL} alt={product.name}/> 
                : <FiShoppingBag className='h-24 w-24 text-neutral-800 m-auto'/>
                }    
          </div>
          <div className=' text-center text-2xl font-bold mr-auto ml-4'>
            <div className='text-orange-500'>
              {product.name}
            </div>
            <div className='my-2'>
                ${orderedProduct.quantity * product.price}
            </div>
          </div>
          <button 
          onClick={()=>{
            addPrice(orderedProduct.quantity * - product.price)
            deleteProduct(id)
           }}
          className='shadow-md shadow-black/60 rounded-2xl p-2 text-white bg-orange-500 rounded-2xlhover:shadow-black/80 h-12 w-12'>
            <AiOutlineDelete className='h-8 w-8'/>
          </button>
    </div>
  )
}

export default OrderCard