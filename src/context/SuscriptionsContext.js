import { useContext, createContext } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore"
import { auth, db } from "../firebase";

const context = createContext()

export const useSuscription = ()=>{
    const newContext = useContext(context)
    return newContext
}

const SuscriptionsProvider = ({children})=>{

    const setCashPaymentMethod = async ()=>{
            const q = query(collection(db, "usernames"), where( "user", "==", auth.currentUser.uid))     
            const data = await getDocs(q)  

            data.forEach((docRef) => {
                updateDoc(doc(db, "usernames", docRef.id), {paymentMethod: 'cash', paid: true})
            })
    }

    const setMercadoPagoPaymentMethod = async ()=>{
        const q = query(collection(db, "usernames"), where( "user", "==", auth.currentUser.uid))     
        const data = await getDocs(q)  

        data.forEach((docRef) => {
            updateDoc(doc(db, "usernames", docRef.id), {paymentMethod: 'mercadopago', paid: true})
        })
    }

    const cancelSuscription = async () => {
        const q = query(collection(db, "usernames"), where( "user", "==", auth.currentUser.uid))     
        const data = await getDocs(q)  

        data.forEach((docRef) => {
            updateDoc(doc(db, "usernames", docRef.id), {paymentMethod: null, paid: false})
        })
    }

    return (
        <context.Provider value={{
            setCashPaymentMethod,
            setMercadoPagoPaymentMethod,
            cancelSuscription
        }}>
        {children}
        </context.Provider>
    );
    }

export default SuscriptionsProvider