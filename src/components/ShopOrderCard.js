import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useProduct } from '../context/ProductContext'
import { useOrder } from '../context/OrderContext'

import { FiShoppingBag } from 'react-icons/fi'

const ShopOrderCard = ({ order }) => {

  const { getProduct } = useProduct()
  const { updateOrder, deleteOrder } = useOrder()

  const [products, setProducts] = useState([])

  const callData = async (orderedProducts) => {
    const prods = []
    for (const orderedProduct of orderedProducts) {
      const res = await getProduct(orderedProduct.product)
      const product = res.data()
      product.id = res.id
      product.quantity = orderedProduct.quantity
      prods.push(product)
    }
    setProducts(prods)
  }
  const handleDelete= ()=>{
    toast(t=>(
        <div>
            <p className='text-white text-xl font-semibold'>¿Seguro que quieres eliminar esta orden?</p>
            <div>
                <button 
                className='bg-red-500 hover:bg-red-400 px-3 py-2 rounded-sm text-sm mx-2 text-white'
                onClick={()=> {
                    deleteOrder(order.id)
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
  useEffect(() => {
    callData(order.orderedProducts)
  }, [order.orderedProducts])
  return (
    <div className='text-black bg-white rounded-3xl w-[85%] shadow-lg shadow-black/40 flex flex-col my-[13px] font-semibold text-xl pb-4'>
      <div className={
        order.completed
        ? 'bg-sky-600 w-full py-6 rounded-t-3xl flex justify-center items-center text-white font-bold text-2xl'
        : order.prepared 
        ? 'bg-sky-300 w-full py-6 rounded-t-3xl flex justify-center items-center text-white font-bold text-2xl'
        : 'bg-orange-500 w-full py-6 rounded-t-3xl flex justify-center items-center text-white font-bold text-2xl'
      }>
          {
            order.completed
            ? 'Completado'
            : order.prepared 
            ? 'Preparado'
            : 'Ordenado'
          }
        </div>
        <div className='w-[70%] px-5 py-2'>
            
            <div className='flex flex-col'>
                <div>{`${order.name} ${order.surname}`}</div>
                <div className='text-black/80 text-lg'>{order.phone_number}</div>
            </div>
        ${order.price}
        {products.map((product) => (
            <div key={product.id} className='flex items-center'>
                {
                product?.imageURL
                    ? 
                    <div className='mx-[5px]'>
                        <img className='object-cover h-14 w-14 rounded-full' src={product.imageURL} alt={product.name}/>
                    </div> 
                    :
                    <FiShoppingBag className='h-12 w-12'/>
                }    
                
                <div className='flex flex-col mx-[5px]'>
                    {product.quantity} {product.name}
                    <div className='text-neutral-500 text-[16px]'>{product.comment}</div>
                </div>
            </div>
        ))}
      </div>
        <div className='w-full flex items-center justify-around my-2 font-semibold text-2xl'>
          <button 
          onClick={()=>updateOrder(order.id, { prepared: !order.prepared })}
          className='shadow-md shadow-black/60 p-2 bg-amber-200 rounded-2xl flex hover:shadow-black/80'>
            📦Preparado
          </button>
          <button
          onClick={()=>updateOrder(order.id, { completed: !order.completed })}
          className='shadow-md shadow-black/60 p-2 bg-amber-200 rounded-2xl flex hover:shadow-black/80'>
            👍
          </button>
          <button 
          onClick={handleDelete}
          className='shadow-md shadow-black/60 p-2 bg-amber-200 rounded-2xl flex hover:shadow-black/80'>
            🗑️
          </button>
        </div>
    </div>
  )
}

export default ShopOrderCard
