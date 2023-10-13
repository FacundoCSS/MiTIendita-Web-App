import { useState, createContext, useContext, useEffect } from "react";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    where,
    doc,
    getDoc,
    updateDoc,
    query,
    onSnapshot,
  } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL, deleteObject } from "firebase/storage";
import { auth, db, storage } from "../firebase";


const context = createContext()

export const useProduct = ()=>{
    const newContext = useContext(context);
    if (!newContext) throw new Error("There is no Product provider");
    return newContext;
};

  
const ProductProvider = ({children})=>{

    const [products, setProducts] = useState([])

    const getProduct = (id) => getDoc(doc(db, "products", id));

    const getProducts = async (userId) => {
    try {
        const documents = []
        const q = query(collection(db, "products"), where("created_by", "==", userId))
        const data = await getDocs(q)
        await data.forEach((doc) => {
            const documentData = doc.data()
            documentData.id = doc.id
            documents.push(documentData)
          })
        setProducts(documents)
    } catch (error) {
        console.log(error)
    }};

    const addProduct = async ({name, price, imageFile, description, category}) => {
        try {
            const docRef = await addDoc(collection(db, "products"), { name, price, description, created_by: auth.currentUser.uid, created_at: new Date(), available: true, category, imageURL: null });            
            if(imageFile){
                const storageRef = ref(storage, docRef.id)
                await uploadBytes(storageRef, imageFile)
                const imageURL = await getDownloadURL(storageRef)
                await updateDoc(docRef, {"imageURL": imageURL});
                // setProducts(products.map((product) => product.id === id ? documentData : product));
                
            }
            getDoc(doc(db, "products", docRef.id)).then((doc)=>{
                const documentData =  doc.data()
                documentData.id = docRef.id
                setProducts([...products, documentData])
            });
            return true;
           
            
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const deleteProduct = async (id) => {
        try {
            await deleteDoc(doc(db, "products", id))
            const storageRef = ref(storage, id)
            setProducts(products.filter((product)=> product.id !== id));
            await deleteObject(storageRef)
        } catch (error) {
            console.log(error)
        }
    }
    

    const updateProduct = async ({name, price, imageFile, description, category}, id) => {
        let imageURL;
        if(imageFile){
            const storageRef = ref(storage, id)
            await uploadBytes(storageRef, imageFile)
            imageURL = await getDownloadURL(storageRef)
            await updateDoc(doc(db, "products", id), {name, price, imageURL, description, category});
        } 
        else {
            await updateDoc(doc(db, "products", id), {name, price, description, category});
        }
        getDoc(doc(db, "products", id)).then((doc)=>{
            const documentData =  doc.data()
            documentData.id = id
            setProducts(products.map((product) => product.id === id ? documentData : product));
        });
    }

  
    useEffect(() => {
        if (auth.currentUser) { 
            const q = query(collection(db, 'products'), where('created_by', '==', auth.currentUser.uid));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const documents = [];
                querySnapshot.forEach((doc) => {
                    const documentData = doc.data();
                    documentData.id = doc.id;
                    documents.push(documentData);
                });
                setProducts(documents);
            });

            return () => {
                unsubscribe();
            };
        }
    }, [auth.currentUser]);

    return (
        <context.Provider value={{
            products,
            getProduct,
            getProducts,
            addProduct,
            deleteProduct,
            updateProduct,
        }}>
            {children}
        </context.Provider>
    );

}

export default ProductProvider