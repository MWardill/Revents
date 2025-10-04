import { doc, onSnapshot, type DocumentData } from "firebase/firestore";
import { useAppSelector } from "../stores/store";
import { useAppBase } from "./useBaseComponent";
import { useCallback, useSyncExternalStore } from "react";
import { setDocument, setError, setLoading } from "../firebase/firestoreSlice";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import { convertTimestamps } from "../../util/utils";

type Options = {
    path: string;
    id?: string;
    listen?: boolean;
}

export const useDocument = <T extends DocumentData>({ path, id, listen = true }: Options) => {
    const dispatch = useAppBase().dispatch;
    const documentData = useAppSelector(state => id ? state.firestore.documents[path]?.[id] as T : undefined);
    const loading = useAppSelector(state => state.firestore.loading);

     const subscribeToDocument = useCallback(() => {
            if (!listen || !id) return () => { }; //no-op if not listening or no id
    
            dispatch(setLoading(true));
            const documentReference = doc(db, path, id);

    
            const unsubscribe = onSnapshot(documentReference, (querySnapshot) => {

                if(!querySnapshot.exists()) {
                    dispatch(setLoading(false));
                    const errorMessage = "Document does not exist";
                    console.error(errorMessage);
                    dispatch(setError(errorMessage));
                    toast.error(errorMessage);
                    return;
                }

                const converted = convertTimestamps(querySnapshot.data() as T);
                dispatch(setDocument({ path, id, value: { id: querySnapshot.id, ...converted as T} }));
                dispatch(setLoading(false));
              
            }, (error) => {
                console.error("Error fetching collection: ", error);
                dispatch(setError("Error fetching collection: " + error.message));
                dispatch(setLoading(false));
                toast.error("Error fetching collection: " + error.message);
            });
    
            //Return runs when component unmounts
            return () => {
                unsubscribe(); //unsubscribe from listener when component unmounts
            }
        }, [dispatch, listen, path, id]);

        useSyncExternalStore(subscribeToDocument, () => documentData);

        return { data: documentData, loading };
}