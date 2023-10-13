import {useState, useContext, createContext, useEffect} from 'react';
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    where,
    doc,
    getDoc,
    updateDoc,
    onSnapshot,
    query
  } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

const context = createContext()

export const useOrder = ()=>{
    const newContext = useContext(context)
    return newContext
}

const OrderProvider = ({children})=>{
   
    const [orders, setOrders] = useState([])
    const [orderedProducts, setOrderedProducts] = useState([])
    const [price, setPrice] = useState(0)
    const [shopId, setShopId] = useState()

    const addToOrder = (data) => {
        setOrderedProducts([...orderedProducts, data])
    }
    const deleteProduct = (id)=>{
        try{
            setOrderedProducts(orderedProducts.filter((orderedProduct)=> orderedProduct.product !== id));
        }
        catch(error){
            Promise.reject(error)
        }
    }

    const addPrice = (productPrice)=>{
        setPrice(price + productPrice)
    }

    const addShopId = (id)=>{
        setShopId(id)
    }

    const getOrder = async(id)=> getDoc(doc(db, "orders", id))

    const getOrders = async (id)=>{
            try {
                const documents = [];
                const q = await getDocs(collection(db, "orders"), where("shop_id", "==", id))
                await q.forEach((doc) => {
                    const documentData = doc.data()
                    documentData.id = doc.id
                    documents.push(documentData)
                  })
                setOrders(documents)
            } catch (error) {
                console.log(error)
        }
    }

    

    const addOrder = async ({name, surname, email, phone_number})=>{
 
        try {
            await addDoc(collection(db, "orders"), { orderedProducts, price, shop_id: shopId, name, surname, email, phone_number, created_at: new Date(), prepared: false, completed: false});
            return true
            
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const updateOrder = async (id, data)=>{
        try {
            await updateDoc(doc(db, "orders", id), data);
        } catch (error) {
            Promise.reject(error)
        }
    }

    const deleteOrder = async (id)=>{
        try{
            await deleteDoc(doc(db, "orders", id))
        }
        catch(error){
            console.log(error)
            Promise.reject(error)
        }
    }

  
   useEffect(() => {
        if (auth.currentUser) { 
            const q = query(collection(db, 'orders'), where('shop_id', '==', auth.currentUser.uid));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const documents = [];
                querySnapshot.forEach((doc) => {
                    const documentData = doc.data();
                    documentData.id = doc.id;
                    documents.push(documentData);
                });
                setOrders(documents);
            });

            return () => {
                unsubscribe();
            };
        }
    }, [auth.currentUser]);


    return (
        <context.Provider value={{
            orders,
            price,
            shopId,
            addPrice,
            addShopId,
            deleteProduct,
            orderedProducts,
            setOrderedProducts,
            addToOrder,
            getOrder,
            getOrders,
            addOrder,
            updateOrder,
            deleteOrder,
        }}>
            {children}
        </context.Provider>
    );
}

export default OrderProvider