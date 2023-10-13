import { useState } from "react"
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { useSuscription } from "../context/SuscriptionsContext"
import { useNavigate } from "react-router-dom"

const Payment = () => {

  const [paymentType, setPaymentType] = useState('null')

  const { setCashPaymentMethod } = useSuscription()

  const navigate = useNavigate()

  
  return (
    <div className="bg-[linear-gradient(#fbbf24,#fde68a)] w-full h-[100vh] flex">
        <div className="bg-white w-[85vw] min-h-[85vh] m-auto rounded-3xl">
            {
              paymentType === 'null' ?
             <div>
               <div className="text-center font-bold text-2xl mt-6">
                Suscribite a MiTiendita
              </div>
              <div className="font-semibold text-xl flex flex-col items-center px-6">
                <div className="text-center font-semibold text-lg mt-6">
                  Cada suscripción cuenta. Con tu apoyo, estamos construyendo un futuro más brillante para los negocios locales 🙌.
                </div>
                <div className="text-center font-semibold text-lg mt-6">
                  Explora Mi Tiendita con 31 días de prueba gratuita y la libertad de elegir entre diferentes medios de pago 💵:
                </div>
                <button 
                onClick={()=>setPaymentType('mercadopago')}
                className="bg-sky-500 px-2 py-3 rounded-md text-white w-[300px] mt-6">
                  Suscripciones de mercadopago
                </button>
                <button 
                onClick={()=>setPaymentType('cash')}
                className="bg-orange-500 px-2 py-3 rounded-md text-white w-[300px] my-6">
                  Efectivo de forma presencial
                </button>
              </div> 
             </div>       
              : paymentType === 'mercadopago' ?
              <div className="px-8">
              <div>
                <AiOutlineArrowLeft onClick={()=>setPaymentType('null')} className="w-8 h-8 mt-3 cursor-pointer"/>
              </div>
                 <div className="font-bold text-2xl mt-6">
                  Suscripción de Mercado Pago 🤝
                </div>
                <div className="font-semibold text-xl">
                  <div className="font-semibold text-lg mt-6">
                    <div className="my-3">
                     Elige la tranquilidad de las suscripciones de Mercado Pago.
                    </div>
                    <div className="my-3">                    
                    Tu suscripción se renueva automáticamente cada mes, y puedes modificar tus preferencias de pago o cancelar en cualquier momento desde la comodidad de tu dispositivo.
                    </div>
                  </div>
                  <a href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848af994da018b0565d359088a" className="bg-sky-500 p-4 rounded-md text-white w-[300px] mt-6 text-center inline-block">
                    Continuar
                  </a>
                </div> 
              </div>
              : paymentType === 'cash' &&
              <div className="px-8">
              <div>
                <AiOutlineArrowLeft onClick={()=>setPaymentType('null')} className="w-8 h-8 mt-4 cursor-pointer"/>
              </div>
                 <div className="font-bold text-2xl mt-6">
                  Pagar cuota mensual en efectivo 💵
                </div>
                <div className="font-semibold text-xl flex flex-col">
                  <div className="font-semibold text-lg mt-6">
                    <div className="my-3">                    
                      Nos preocupamos por tu comodidad.
                    </div>
                    <div className="my-3">                    
                    Optando por el pago en efectivo, te ahorramos la molestia de hacer pagos en línea y te visitamos personalmente para mantener activa tu suscripción.
                    </div>
                    <div className="my-3">                    
                    Tu satisfacción es nuestra prioridad.
                    </div>
                  </div>
                  <button
                  onClick={()=>{
                    setCashPaymentMethod()
                    navigate('/')
                  }}
                  className="bg-orange-500 p-4 rounded-md text-white  w-[70vw] max-w-xs my-6">
                    Continuar
                  </button>
                </div> 
              </div>
            }
        </div>
    </div>
  )
}

export default Payment