import {useEffect, useState} from 'react'

import { useOrder } from '../context/OrderContext'
import { useAuth } from '../context/AuthContext'

import NavBar from '../components/NavBar'
import ShopOrderCard from '../components/ShopOrderCard'

const Orders = () => {

  const [wasCalled, setWasCalled] = useState(false)
  const [screenOrders, setScreenOrders] = useState()
  const [ordersState, setOrdersState] = useState('all')

  const {getOrders, orders} = useOrder()
  const {user} = useAuth()

  const callData = async (id)=>{
    await getOrders(id)
    setWasCalled(true)
  }

  useEffect(()=>{
    if (user && !wasCalled) callData(user.uid)
  })

  useEffect(()=>{
    setScreenOrders(orders)
  }, [orders])

  return (
  <div>
    <NavBar/>
    <div className='w-full pt-[10vh]'>
      <div className='flex items-center justify-around py-4 bg-amber-300'>
        <div 
        className={
          ordersState === 'all'
          ? 'bg-amber-500 rounded-2xl p-2 shadow-md shadow-black/40 cursor-pointer hover:bg-amber-500 font-bold transition-all duration duration-200'
          : 'bg-amber-100 rounded-2xl p-2 shadow-md shadow-black/40 cursor-pointer hover:bg-amber-500 font-bold transition-all duration duration-200'
        }
        onClick={()=>{
          setScreenOrders(orders)
          setOrdersState('all')
        }}
        >
          Todas
        </div>
        <div 
        className={
          ordersState === 'ordered'
          ? 'bg-amber-500 rounded-2xl p-2 shadow-md shadow-black/40 cursor-pointer hover:bg-amber-500 font-bold transition-all duration duration-200'
          : 'bg-amber-100 rounded-2xl p-2 shadow-md shadow-black/40 cursor-pointer hover:bg-amber-500 font-bold transition-all duration duration-200'
        }
        onClick={() => {
          setScreenOrders(orders.filter((order) => !order.prepared && !order.completed));
          setOrdersState('ordered')
        }}        
        >
          Ordenados
        </div>
        <div 
        className={
          ordersState === 'prepared'
          ? 'bg-amber-500 rounded-2xl p-2 shadow-md shadow-black/40 cursor-pointer hover:bg-amber-500 font-bold transition-all duration duration-200'
          : 'bg-amber-100 rounded-2xl p-2 shadow-md shadow-black/40 cursor-pointer hover:bg-amber-500 font-bold transition-all duration duration-200'
        }
        onClick={() => {
          setScreenOrders(orders.filter((order) => order.prepared && !order.completed));
          setOrdersState('prepared')
        }}        
        >
          Preparados
        </div>
        <div 
        className={
          ordersState === 'completed'
          ? 'bg-amber-500 rounded-2xl p-2 shadow-md shadow-black/40 cursor-pointer hover:bg-amber-500 font-bold transition-all duration duration-200'
          : 'bg-amber-100 rounded-2xl p-2 shadow-md shadow-black/40 cursor-pointer hover:bg-amber-500 font-bold transition-all duration duration-200'
        }
        onClick={() => {
          setScreenOrders(orders.filter((order) => order.completed));
          setOrdersState('completed')
        }}        
        >
          Completados
        </div>
      </div>
    </div>
    <div className='bg-amber-300 min-h-[100dvh] flex flex-col items-center'>
      {
        screenOrders 
        ?
        screenOrders.map((order)=>{
          return <ShopOrderCard order={order} key={order.id}/>
        })
        :
        'No tienes ordenes todavia'
      }
    </div>
  </div>
  )
}

export default Orders