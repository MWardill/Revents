import { collection, deleteDoc, doc, setDoc, updateDoc, type DocumentData } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useState } from "react";

type Options = {
    path: string;
}

export const useFirestoreActions = <T extends DocumentData>({ path }: Options) => {
    const [fsSubmitting, setSubmitting] = useState(false);
    
    const fsCreate = async (data: T) => {
        setSubmitting(true);
        try {
            // Implement create logic here  
            const ref = doc(collection(db, path));
            await setDoc(ref,data);
            return ref;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
           setSubmitting(false); 
        }
    }
        
    const fsSetDocument = async (id: string, data: T) => {
        setSubmitting(true);
        try {
            // Implement create logic here  
            await setDoc(doc(db, path, id), data);                        
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
           setSubmitting(false); 
        }
    }

    const fsUpdate = async (id: string, data: T) => {
        setSubmitting(true);
        try {
            // Implement update logic here
            const ref = doc(db, path, id);
            await updateDoc(ref, data);
            return ref;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setSubmitting(false); 
        }
    }

    
    const fsRemove = async (id: string) => {
        setSubmitting(true);
        try {
            // Implement update logic here
            const ref = doc(db, path, id);
            await deleteDoc(ref);
            return ref;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setSubmitting(false); 
        }
    }
    

    return {fsCreate, fsUpdate, fsRemove, fsSubmitting, fsSetDocument};
}