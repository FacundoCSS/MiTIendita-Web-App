import React, {useState} from 'react';
import {FiShoppingBag} from 'react-icons/fi';
import { useOrder } from '../context/OrderContext';

const ProductCard = ({product, setIsOpenProduct}) => {
  const [counter, setCounter] = useState(1)

  const {addToOrder, addPrice, addShopId} = useOrder()

  const handleSubmit = async ()=>{
    await addToOrder({ product: product.id, quantity: counter })
    await addShopId(product.created_by)
    await addPrice(product.price * counter)
    setIsOpenProduct(false)
  }

  return (
  <div className='flex flex-col justify-around items-center max-h-[100vh] py-[5vh]'>
    
    <div className='w-full flex'>
    {product?.imageURL 
                ? <img className='object-cover max-w-full h-[250px] max-h-[20vh] mx-auto' src={product.imageURL } alt={product.name}/> 
                :<div className='w-full h-[250px] flex bg-white'><FiShoppingBag className='h-[200px] w-[200px] text-neutral-900 m-auto'/></div>
    }
    </div>
    <div className='text-3xl text-center font-bold max-h-[5vh]'>
        {product.name}
    </div>
    <div className='flex flex-col bg-white max-w-[90vw] max-h-[45vh] mx-auto py-10 my-10 rounded-3xl shadow-xl shadow-black/40 text-black'>

        <div className='px-[5%] py-[15px] font-bold text-2xl'>
            <div className='rounded-2xl'>
                ${product.price}
            </div>
        </div>
        <div className='px-[5%] text-xl'>
            {product.description}
        </div>
        <div className='flex justify-between my-[15px] px-[3px] w-[90%] m-auto font-bold text-2xl'>
            <div 
            className='w-14 h-14 flex items-center justify-center bg-[#fe8405] text-white rounded-full cursor-pointer text-center'
            onClick={()=>{
                if(counter !== 1){
                    setCounter(counter - 1)
                }
            }}
            >
                -
            </div>
            <div className='text-center py-[7px]'>
                {counter}
            </div>
            <div 
            className='w-14 h-14 flex items-center justify-center bg-[#fe8405] text-white rounded-full cursor-pointer text-center'
            onClick={()=>{setCounter(counter + 1)}}
            >
                +
            </div>
        </div>
    </div>
    <div className='w-full max-h-[25vh]'>
        <button 
        onClick={handleSubmit}
        className='w-[90%] max-w-[400px] m-auto flex items-center justify-around rounded-2xl p-4 text-xl bg-[#fe8405] font-semibold text-white mt-[14px] shadow-md shadow-black/40 hover:shadow-black/60 tansition-all'>
            <div>Agregar a mi pedido</div>
            <div>${product.price * counter}</div>
        </button>
    </div>
</div>
);
};

export default ProductCard