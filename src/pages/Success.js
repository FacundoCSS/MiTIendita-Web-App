import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSuscription } from "../context/SuscriptionsContext"
import NavBar from "../components/NavBar"
import { useAuth } from "../context/AuthContext";

const Success = () => {

  const [wasCalled, setWasCalled] = useState(false)

  const { setMercadoPagoPaymentMethod } = useSuscription()

  const { user } = useAuth();
  const navigate = useNavigate()

  const callContext = ()=>{
    setMercadoPagoPaymentMethod()
    setWasCalled(true)
  }

  if (user && !wasCalled) callContext()

  return (
    <div className="w-full h-[100vh] bg-[linear-gradient(#fbbf24,#fde68a)]">
      <NavBar/>
      <div className="pt-[10vh]">
        <div className="bg-white m-12 text-xl flex flex-col text-center items-center px-8">
          <div className="mt-6 font-bold ">
            Tu suscripción se ha completado con éxito 🌟.
          </div>
          <div>
           ¡Estamos emocionados de tenerte a bordo!
          </div>
          <Link
          className="text-2xl p-4 rounded-lg bg-sky-500 text-white my-10 font-bold"
          to='/' 
          >
            Ir al inicio
          </Link>
        </div>
       
      </div>
    </div>
  )
}

export default Success