import {useContext, createContext, useState, useEffect} from 'react';
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot,
  } from "firebase/firestore";
import { db } from "../firebase";

const context = createContext()

export const useAppointment = ()=>{
    const newContext = useContext(context)
    return newContext
}

const AppointmentProvider = ({children})=>{

    const [appointments, setAppointments] = useState()
    const [user, setUser] = useState()

    const getAppointments = async (username) => {
        try {
            const documents = []
            const q = query(collection(db, "appointments"), where("username", "==", username))
            const data = await getDocs(q)
            await data.forEach((doc) => {
                const documentData = doc.data()
                documentData.id = doc.id
                documents.push(documentData)
              })
            setAppointments(documents)
            return documents
        } catch (error) {
            console.log(error)
        }};

        const getAppointmentsById = async (id) =>{
            let userData
            const q = query(collection(db, "usernames"), where( "user", "==", id))   
            const data = await getDocs(q)    
            if(!data.empty){
              data.forEach((docRef)=>{
                userData = docRef.data()
              })
            }
            setUser(userData)

            try {
                const documents = []
                const q = query(collection(db, "appointments"), where("username", "==", userData.username))
                const data = await getDocs(q)
                await data.forEach((doc) => {
                    const documentData = doc.data()
                    documentData.id = doc.id
                    documents.push(documentData)
                  })
                setAppointments(documents)
                return documents
            } catch (error) {
                console.log(error)
            }
        };

        const addAppointment = async ({name, surname, phone, reason},schedule, shop, id)=>{
 
            try {
                if(shop && !id){
                    await addDoc(collection(db, "appointments"), { name, surname, phone, reason, schedule, username: shop, shop_id: id, created_at: new Date() });
                }
                else if (!shop && id) {
                    let userData
                    const q = query(collection(db, "usernames"), where( "user", "==", id))   
                    const data = await getDocs(q)    
                    if(!data.empty){
                      data.forEach((docRef)=>{
                        userData = docRef.data()
                      })
                    }
                    await addDoc(collection(db, "appointments"), { name, surname, phone, reason, schedule, username: userData.username, shop_id: id, created_at: new Date() });
        
                }
                return true
            } catch (error) {
                console.log(error)
            }
        }

        const cancelAppointment = async (id)=>{
            try{
                await deleteDoc(doc(db, "appointments", id))
                return true
            }
            catch(error){
                console.log(error)
                Promise.reject(error)
            }
        }

        useEffect(() => {
            if (user) { 
                const q = query(collection(db, 'appointments'), where('username', '==', user.username));
    
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const documents = [];
                    querySnapshot.forEach((doc) => {
                        const documentData = doc.data();
                        documentData.id = doc.id;
                        documents.push(documentData);
                    });
                    setAppointments(documents);
                });
    
                return () => {
                    unsubscribe();
                };
            }
        }, [user]);
    
    
    return (
        <context.Provider value={{
            appointments,
            getAppointments,
            getAppointmentsById,
            addAppointment,
            cancelAppointment
        }}>
            {children}
        </context.Provider>
    );
}

export default AppointmentProvider
